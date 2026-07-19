const ApiError = require('../utils/ApiError');
const { NODE_ENV } = require('../config/env');

// Centralized error handling middleware. All thrown/forwarded errors land here.
const errorHandler = (err, req, res, next) => {
  let error = err;

  if (!(error instanceof ApiError)) {
    let statusCode = error.statusCode || 500;
    let message = error.message || 'Internal Server Error';

    // Mongoose validation errors
    if (error.name === 'ValidationError') {
      statusCode = 400;
      message = Object.values(error.errors)
        .map((val) => val.message)
        .join(', ');
    }

    // Mongoose duplicate key error
    if (error.code === 11000) {
      statusCode = 409;
      const field = Object.keys(error.keyValue || {})[0];
      message = `Duplicate value for field '${field}'`;
    }

    // Mongoose invalid ObjectId
    if (error.name === 'CastError') {
      statusCode = 400;
      message = `Invalid value for field '${error.path}'`;
    }

    error = new ApiError(statusCode, message);
  }

  const response = {
    success: false,
    message: error.message,
    errors: error.errors || [],
  };

  if (NODE_ENV === 'development') {
    response.stack = err.stack;
  }

  res.status(error.statusCode || 500).json(response);
};

const notFound = (req, res, next) => {
  next(new ApiError(404, `Route not found: ${req.originalUrl}`));
};

module.exports = { errorHandler, notFound };
