import  express from 'express';
import  asyncHandler from '../middlewares/asyncHandler.js';
import  employeeController from '../controllers/employee.controller.js';
import  validateObjectId from '../middlewares/validateObjectId.js';
import  { validateRoles } from '../middlewares/validateRoles.js';
import {validate} from "../middlewares/validate.middleware.js"
import { createEmployeeSchema, updateEmployeeSchema } from '../validation/employee.validation.js';

const router = express.Router();

// Public read endpoints
router.get('/', asyncHandler(employeeController.getAll));
router.get('/:id',
    validateObjectId,
    asyncHandler(employeeController.getOne)
);
// Protected endpoints - example uses role-based guard
router.post('/',
    validate(createEmployeeSchema),
    asyncHandler(employeeController.create)
);
router.put('/:id',
    validateObjectId,
    validate(updateEmployeeSchema),
    validateRoles,
    asyncHandler(employeeController.updateArrays)
);
router.delete('/:id',
    validateObjectId,
    asyncHandler(employeeController.remove)
);

router.patch("/auth/signup",
    validate(updateEmployeeSchema),
    asyncHandler(employeeController.signup)
);
router.post("/auth/signin", 
    validate(updateEmployeeSchema),
    asyncHandler(employeeController.signin)
);

export default router;