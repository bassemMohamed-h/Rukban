import express from 'express'
import asyncHandler from '../middlewares/asyncHandler.js';
import departmentController from '../controllers/department.controller.js';
import validateObjectId from '../middlewares/validateObjectId.js';
import { validate } from '../middlewares/validate.middleware.js';
import { createDepartmentSchema } from '../validation/department.validation.js';
import { updateTeamSchema } from '../validation/team.validation.js';
const router = express.Router();

router.get('/',asyncHandler(departmentController.getAll))
router.get('/:id',
    validateObjectId,
    asyncHandler(departmentController.getOne)
)

router.post('/',
    validate(createDepartmentSchema),
    asyncHandler(departmentController.create)
)

router.put('/:id',
    validate(updateTeamSchema),
    validateObjectId,
    asyncHandler(departmentController.updateArrays))

router.delete('/:id'),
validateObjectId,
asyncHandler(departmentController.remove)

export default router