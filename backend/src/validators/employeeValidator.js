const { body, param } = require('express-validator');

const ROLES = ['super_admin', 'hr_manager', 'employee'];
const STATUSES = ['active', 'inactive'];

const createEmployeeValidator = [
  body('name').trim().isLength({ min: 2, max: 100 }).withMessage('Name must be 2-100 characters'),
  body('email').isEmail().withMessage('A valid email is required').normalizeEmail(),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('phone').matches(/^[0-9]{10}$/).withMessage('Phone must be a valid 10-digit number'),
  body('department').trim().notEmpty().withMessage('Department is required'),
  body('designation').trim().notEmpty().withMessage('Designation is required'),
  body('salary').isFloat({ min: 0 }).withMessage('Salary must be a positive number'),
  body('joiningDate').optional().isISO8601().withMessage('Joining date must be a valid date'),
  body('status').optional().isIn(STATUSES).withMessage(`Status must be one of: ${STATUSES.join(', ')}`),
  body('role').optional().isIn(ROLES).withMessage(`Role must be one of: ${ROLES.join(', ')}`),
  body('reportingManager').optional({ nullable: true }).isMongoId().withMessage('Invalid reporting manager id'),
];

const updateEmployeeValidator = [
  param('id').isMongoId().withMessage('Invalid employee id'),
  body('name').optional().trim().isLength({ min: 2, max: 100 }),
  body('email').optional().isEmail().normalizeEmail(),
  body('phone').optional().matches(/^[0-9]{10}$/),
  body('department').optional().trim().notEmpty(),
  body('designation').optional().trim().notEmpty(),
  body('salary').optional().isFloat({ min: 0 }),
  body('joiningDate').optional().isISO8601(),
  body('status').optional().isIn(STATUSES),
  body('role').optional().isIn(ROLES),
  body('reportingManager').optional({ nullable: true }).isMongoId(),
];

const assignManagerValidator = [
  param('id').isMongoId().withMessage('Invalid employee id'),
  body('managerId').optional({ nullable: true }).isMongoId().withMessage('Invalid manager id'),
];

module.exports = { createEmployeeValidator, updateEmployeeValidator, assignManagerValidator };
