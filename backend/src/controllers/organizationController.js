const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const organizationService = require('../services/organizationService');

// GET /api/organization/tree
const getOrganizationTree = asyncHandler(async (req, res) => {
  const tree = await organizationService.getOrganizationTree();
  res.status(200).json(new ApiResponse(200, tree, 'Organization tree fetched'));
});

module.exports = { getOrganizationTree };
