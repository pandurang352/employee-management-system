const Employee = require('../models/Employee');

// Recursively builds a nested org tree starting from top-level employees
// (those with no reporting manager).
const buildTree = async (managerId = null) => {
  const employees = await Employee.find({ reportingManager: managerId, isDeleted: false }).select(
    'name employeeId designation department status profileImage reportingManager'
  );

  const nodes = await Promise.all(
    employees.map(async (emp) => ({
      _id: emp._id,
      employeeId: emp.employeeId,
      name: emp.name,
      designation: emp.designation,
      department: emp.department,
      status: emp.status,
      profileImage: emp.profileImage,
      children: await buildTree(emp._id),
    }))
  );

  return nodes;
};

const getOrganizationTree = async () => buildTree(null);

module.exports = { getOrganizationTree };
