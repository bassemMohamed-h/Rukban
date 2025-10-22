const express = require('express');
const asyncHandler = require('../middlewares/asyncHandler');
const employeeController = require('../controllers/employee.controller');
const { protect, authorize } = require('../middlewares/auth.middleware');
const validateObjectId = require('../middlewares/validateObjectId');
const { validateRoles } = require('../middlewares/validateRoles');

const router = express.Router();

// Public read endpoints
router.get('/', asyncHandler(employeeController.getAll));
router.get('/:id',
    validateObjectId,
    asyncHandler(employeeController.getOne));

// Protected endpoints - example uses role-based guard
router.post('/', asyncHandler(employeeController.create));
router.put('/:id',
    validateObjectId,
    validateRoles,
    asyncHandler(employeeController.updateArrays));
router.delete('/:id',
    validateObjectId,
    asyncHandler(employeeController.remove));

module.exports = router;