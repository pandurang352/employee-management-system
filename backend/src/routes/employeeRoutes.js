const express = require('express');
const {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  assignManager,
  getReportees,
  importEmployees,
} = require('../controllers/employeeController');
const {
  createEmployeeValidator,
  updateEmployeeValidator,
  assignManagerValidator,
} = require('../validators/employeeValidator');
const validate = require('../middleware/validate');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/roleCheck');
const upload = require('../middleware/upload');

const router = express.Router();

router.use(protect);

router
  .route('/')
  .get(getEmployees)
  .post(authorize('super_admin', 'hr_manager'), createEmployeeValidator, validate, createEmployee);

router.post(
  '/import',
  authorize('super_admin', 'hr_manager'),
  upload.single('file'),
  importEmployees
);

router
  .route('/:id')
  .get(getEmployee)
  .put(updateEmployeeValidator, validate, updateEmployee)
  .delete(authorize('super_admin'), deleteEmployee);

router.get('/:id/reportees', getReportees);
router.patch(
  '/:id/manager',
  authorize('super_admin', 'hr_manager'),
  assignManagerValidator,
  validate,
  assignManager
);

module.exports = router;
