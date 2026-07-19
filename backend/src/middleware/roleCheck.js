const ApiError = require('../utils/ApiError');

// Restricts a route to the given roles. Usage: authorize('super_admin', 'hr_manager')
const authorize = (...allowedRoles) => (req, res, next) => {
  if (!req.user) {
    throw new ApiError(401, 'Not authorized');
  }
  if (!allowedRoles.includes(req.user.role)) {
    throw new ApiError(403, `Role '${req.user.role}' is not permitted to perform this action`);
  }
  next();
};

module.exports = { authorize };
