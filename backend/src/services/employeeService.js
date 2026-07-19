const Employee = require('../models/Employee');
const ApiError = require('../utils/ApiError');
const { getPagination, buildPaginationMeta } = require('../utils/pagination');

// Builds the Mongoose filter object from query params
const buildFilter = ({ search, department, role, status }) => {
  const filter = { isDeleted: false };

  if (department) filter.department = department;
  if (role) filter.role = role;
  if (status) filter.status = status;

  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
    ];
  }

  return filter;
};

const buildSort = (sortBy, order) => {
  const allowedSortFields = ['name', 'joiningDate', 'createdAt'];
  const field = allowedSortFields.includes(sortBy) ? sortBy : 'createdAt';
  const direction = order === 'asc' ? 1 : -1;
  return { [field]: direction };
};

const listEmployees = async (query) => {
  const { page, limit, skip } = getPagination(query);
  const filter = buildFilter(query);
  const sort = buildSort(query.sortBy, query.order);

  const [employees, total] = await Promise.all([
    Employee.find(filter)
      .populate('reportingManager', 'name employeeId designation')
      .sort(sort)
      .skip(skip)
      .limit(limit),
    Employee.countDocuments(filter),
  ]);

  return { employees, meta: buildPaginationMeta(total, page, limit) };
};

const getEmployeeById = async (id) => {
  const employee = await Employee.findOne({ _id: id, isDeleted: false }).populate(
    'reportingManager',
    'name employeeId designation'
  );
  if (!employee) throw new ApiError(404, 'Employee not found');
  return employee;
};

const createEmployee = async (data, creatorRole) => {
  if (data.role === 'super_admin' && creatorRole !== 'super_admin') {
    throw new ApiError(403, 'Only a Super Admin can assign the Super Admin role');
  }

  if (data.reportingManager) {
    const manager = await Employee.findOne({ _id: data.reportingManager, isDeleted: false });
    if (!manager) throw new ApiError(400, 'Reporting manager does not exist');
  }

  const employee = await Employee.create(data);
  return employee.toSafeObject();
};

const wouldCreateCircularReporting = async (employeeId, newManagerId) => {
  // Walk up the chain from the proposed manager; if we ever hit employeeId, it's circular
  let currentId = newManagerId;
  const visited = new Set();

  while (currentId) {
    if (String(currentId) === String(employeeId)) return true;
    if (visited.has(String(currentId))) break; // safety guard against pre-existing bad data
    visited.add(String(currentId));

    const current = await Employee.findById(currentId).select('reportingManager');
    if (!current) break;
    currentId = current.reportingManager;
  }

  return false;
};

const updateEmployee = async (id, data, requester) => {
  const employee = await Employee.findOne({ _id: id, isDeleted: false });
  if (!employee) throw new ApiError(404, 'Employee not found');

  if (requester.role === 'hr_manager' && data.role === 'super_admin') {
    throw new ApiError(403, 'HR cannot assign the Super Admin role');
  }

  if (requester.role === 'employee') {
    const allowedFields = ['phone', 'profileImage'];
    Object.keys(data).forEach((key) => {
      if (!allowedFields.includes(key)) delete data[key];
    });
  }

  if (data.reportingManager) {
    if (String(data.reportingManager) === String(id)) {
      throw new ApiError(400, 'An employee cannot report to themselves');
    }
    const circular = await wouldCreateCircularReporting(id, data.reportingManager);
    if (circular) {
      throw new ApiError(400, 'This assignment would create a circular reporting structure');
    }
  }

  Object.assign(employee, data);
  await employee.save();
  return employee.toSafeObject();
};

const deleteEmployee = async (id) => {
  const employee = await Employee.findOne({ _id: id, isDeleted: false });
  if (!employee) throw new ApiError(404, 'Employee not found');

  // Detach any direct reports before soft-deleting to keep the org tree consistent
  await Employee.updateMany({ reportingManager: id }, { $set: { reportingManager: null } });

  employee.isDeleted = true;
  employee.deletedAt = new Date();
  await employee.save();
  return employee.toSafeObject();
};

const assignManager = async (id, managerId) => {
  if (String(id) === String(managerId)) {
    throw new ApiError(400, 'An employee cannot report to themselves');
  }

  const employee = await Employee.findOne({ _id: id, isDeleted: false });
  if (!employee) throw new ApiError(404, 'Employee not found');

  if (managerId) {
    const manager = await Employee.findOne({ _id: managerId, isDeleted: false });
    if (!manager) throw new ApiError(400, 'Reporting manager does not exist');

    const circular = await wouldCreateCircularReporting(id, managerId);
    if (circular) {
      throw new ApiError(400, 'This assignment would create a circular reporting structure');
    }
  }

  employee.reportingManager = managerId || null;
  await employee.save();
  return employee.toSafeObject();
};

const getReportees = async (id) => {
  const reportees = await Employee.find({ reportingManager: id, isDeleted: false }).select(
    'name employeeId designation department status profileImage'
  );
  return reportees;
};

const getDashboardStats = async () => {
  const [total, active, inactive, departments] = await Promise.all([
    Employee.countDocuments({ isDeleted: false }),
    Employee.countDocuments({ isDeleted: false, status: 'active' }),
    Employee.countDocuments({ isDeleted: false, status: 'inactive' }),
    Employee.distinct('department', { isDeleted: false }),
  ]);

  const byDepartment = await Employee.aggregate([
    { $match: { isDeleted: false } },
    { $group: { _id: '$department', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
  ]);

  return {
    totalEmployees: total,
    activeEmployees: active,
    inactiveEmployees: inactive,
    departmentCount: departments.length,
    byDepartment: byDepartment.map((d) => ({ department: d._id, count: d.count })),
  };
};

module.exports = {
  listEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  assignManager,
  getReportees,
  getDashboardStats,
  wouldCreateCircularReporting,
};
