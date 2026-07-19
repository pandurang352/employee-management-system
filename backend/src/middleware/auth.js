const jwt = require('jsonwebtoken');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const Employee = require('../models/Employee');
const { JWT_SECRET } = require('../config/env');

// Verifies the JWT from the Authorization header and attaches req.user
const protect = asyncHandler(async (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  }

  if (!token) {
    throw new ApiError(401, 'Not authorized, no token provided');
  }

  let decoded;
  try {
    decoded = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new ApiError(401, 'Not authorized, token invalid or expired');
  }

  const user = await Employee.findOne({ _id: decoded.id, isDeleted: false });
  if (!user) {
    throw new ApiError(401, 'Not authorized, user no longer exists');
  }

  if (user.status === 'inactive') {
    throw new ApiError(403, 'Account is inactive. Contact your administrator.');
  }

  req.user = user;
  next();
});

module.exports = { protect };
