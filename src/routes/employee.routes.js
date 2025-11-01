import  express from 'express';
import  asyncHandler from '../middlewares/asyncHandler.js';
import  employeeController from '../controllers/employee.controller.js';
import  validateObjectId from '../middlewares/validateObjectId.js';
import  { validateRoles } from '../middlewares/validateRoles.js';

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

router.patch("/auth/signup",asyncHandler(employeeController.signup));
router.post("/auth/signin", asyncHandler(employeeController.signin));

export default router;