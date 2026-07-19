const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const employeeService = require('../services/employeeService');
const Employee = require('../models/Employee');
const csv = require('csv-parse/sync');
const fs = require('fs');

// GET /api/employees
const getEmployees = asyncHandler(async (req, res) => {
  // Employees can only view their own profile, never the full list
  if (req.user.role === 'employee') {
    throw new ApiError(403, 'Employees cannot view other employee records');
  }
  const { employees, meta } = await employeeService.listEmployees(req.query);
  res.status(200).json(new ApiResponse(200, { employees, meta }, 'Employees fetched'));
});

// GET /api/employees/:id
const getEmployee = asyncHandler(async (req, res) => {
  if (req.user.role === 'employee' && String(req.user._id) !== req.params.id) {
    throw new ApiError(403, 'Employees can only view their own profile');
  }
  const employee = await employeeService.getEmployeeById(req.params.id);
  res.status(200).json(new ApiResponse(200, employee, 'Employee fetched'));
});

// POST /api/employees
const createEmployee = asyncHandler(async (req, res) => {
  const employee = await employeeService.createEmployee(req.body, req.user.role);
  res.status(201).json(new ApiResponse(201, employee, 'Employee created'));
});

// PUT /api/employees/:id
const updateEmployee = asyncHandler(async (req, res) => {
  if (req.user.role === 'employee' && String(req.user._id) !== req.params.id) {
    throw new ApiError(403, 'Employees can only edit their own profile');
  }
  const employee = await employeeService.updateEmployee(req.params.id, req.body, req.user);
  res.status(200).json(new ApiResponse(200, employee, 'Employee updated'));
});

// DELETE /api/employees/:id
const deleteEmployee = asyncHandler(async (req, res) => {
  // Only Super Admin reaches here (enforced by route middleware), soft delete only
  const employee = await employeeService.deleteEmployee(req.params.id);
  res.status(200).json(new ApiResponse(200, employee, 'Employee deleted'));
});

// PATCH /api/employees/:id/manager
const assignManager = asyncHandler(async (req, res) => {
  const employee = await employeeService.assignManager(req.params.id, req.body.managerId);
  res.status(200).json(new ApiResponse(200, employee, 'Reporting manager updated'));
});

// GET /api/employees/:id/reportees
const getReportees = asyncHandler(async (req, res) => {
  const reportees = await employeeService.getReportees(req.params.id);
  res.status(200).json(new ApiResponse(200, reportees, 'Reportees fetched'));
});

// POST /api/employees/import (CSV bulk import - bonus feature)
const importEmployees = asyncHandler(async (req, res) => {
  if (!req.file) throw new ApiError(400, 'CSV file is required');

  const fileContent = fs.readFileSync(req.file.path, 'utf-8');
  const records = csv.parse(fileContent, { columns: true, skip_empty_lines: true, trim: true });

  const results = { created: 0, failed: [] };

  for (const row of records) {
    try {
      await employeeService.createEmployee(
        {
          name: row.name,
          email: row.email,
          password: row.password || 'Welcome@123',
          phone: row.phone,
          department: row.department,
          designation: row.designation,
          salary: Number(row.salary),
          joiningDate: row.joiningDate ? new Date(row.joiningDate) : undefined,
          role: row.role || 'employee',
        },
        req.user.role
      );
      results.created += 1;
    } catch (err) {
      results.failed.push({ row, reason: err.message });
    }
  }

  fs.unlink(req.file.path, () => {});

  res.status(201).json(new ApiResponse(201, results, 'CSV import completed'));
});

module.exports = {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  assignManager,
  getReportees,
  importEmployees,
};
