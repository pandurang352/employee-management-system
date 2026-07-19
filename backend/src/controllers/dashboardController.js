const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const employeeService = require('../services/employeeService');

// GET /api/dashboard/stats
const getStats = asyncHandler(async (req, res) => {
  const stats = await employeeService.getDashboardStats();
  res.status(200).json(new ApiResponse(200, stats, 'Dashboard stats fetched'));
});

module.exports = { getStats };
