const Employee = require('../models/Employee');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const generateToken = require('../utils/generateToken');

// POST /api/auth/login
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await Employee.findOne({ email: email.toLowerCase(), isDeleted: false }).select('+password');
  if (!user) throw new ApiError(401, 'Invalid email or password');

  if (user.status === 'inactive') {
    throw new ApiError(403, 'Account is inactive. Contact your administrator.');
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw new ApiError(401, 'Invalid email or password');

  const token = generateToken({ id: user._id, role: user.role });

  res.status(200).json(
    new ApiResponse(
      200,
      { token, user: user.toSafeObject() },
      'Login successful'
    )
  );
});

// POST /api/auth/logout
// Stateless JWT: logout is handled client-side by discarding the token.
// Endpoint exists for API completeness / future token-blacklist support.
const logout = asyncHandler(async (req, res) => {
  res.status(200).json(new ApiResponse(200, null, 'Logout successful'));
});

// GET /api/auth/me
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(new ApiResponse(200, req.user.toSafeObject(), 'Current user fetched'));
});

module.exports = { login, logout, getMe };
