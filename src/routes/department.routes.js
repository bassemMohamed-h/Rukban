import express from 'express'
import asyncHandler from '../middlewares/asyncHandler.js';
import departmentController from '../controllers/department.controller.js';
import validateObjectId from '../middlewares/validateObjectId.js';
import { validate } from '../middlewares/validate.middleware.js';
import { createDepartmentSchema, updateDepartmentSchema } from '../validation/department.validation.js';
import { actions, authorize, sections } from '../middlewares/authorization.middleware.js';
const router = express.Router();

router.get('/',
    authorize(sections.departments,[actions.display]),
    asyncHandler(departmentController.getAll)
)
router.get('/:departmentId',
    validateObjectId("departmentId"),
    authorize(sections.departments,[actions.display]),
    asyncHandler(departmentController.getOne)
)
router.post('/',
    validate(createDepartmentSchema),
    authorize(sections.departments,[actions.manage]),
    asyncHandler(departmentController.create)
)
router.delete('/:departmentId',
    validateObjectId("departmentId"),
    authorize(sections.departments,[actions.manage]),
    asyncHandler(departmentController.remove)
)
router.put('/:departmentId',
    validate(updateDepartmentSchema),
    validateObjectId("departmentId"),
    authorize(sections.departments,[actions.update]),
    asyncHandler(departmentController.update)
)
export default router