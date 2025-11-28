import  express from 'express';
import  asyncHandler from '../middlewares/asyncHandler.js';
import  employeeController from '../controllers/employee.controller.js';
import  validateObjectId from '../middlewares/validateObjectId.js';
import {validate} from "../middlewares/validate.middleware.js"
import { createEmployeeSchema, updateEmployeeSchema } from '../validation/employee.validation.js';
import { actions, authorize, sections } from '../middlewares/authorization.middleware.js';

const router = express.Router();

// Public read endpoints
router.get('/', 
    authorize(sections.employees,actions.display),
    asyncHandler(employeeController.getAll)
);
router.get('/:employeeId',
    validateObjectId("employeeId"),
    authorize(sections.employees,actions.display),
    asyncHandler(employeeController.getOne)
);
router.post('/',
    validate(createEmployeeSchema),
    authorize(sections.employees,actions.manage),
    asyncHandler(employeeController.create)
);
router.delete('/:employeeId',
    validateObjectId("employeeId"),
    authorize(sections.employees,actions.manage),
    asyncHandler(employeeController.remove)
);
router.put('/:employeeId',
    validateObjectId("employeeId"),
    validate(updateEmployeeSchema),
    authorize(sections.employees,actions.update),
    asyncHandler(employeeController.update)
);
export default router;