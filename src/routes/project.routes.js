import express from "express";
import asyncHandler from "../middlewares/asyncHandler.js";
import validateObjectId from "../middlewares/validateObjectId.js";
import project from "../controllers/project.controller.js";
import {validate} from "../middlewares/validate.middleware.js"
import { createProjectSchema, updateProjectSchema } from "../validation/project.validation.js";
import { actions, authorize, sections } from "../middlewares/authorization.middleware.js";
const router = express.Router();

router.get("/",
    authorize(sections.projects,[actions.display]),
    asyncHandler(project.getAll)
)
router.get("/:projectId",
    validateObjectId("projectId"),
    authorize(sections.projects,[actions.display]),
    asyncHandler(project.getOne)
)
router.post("/",
    validate(createProjectSchema),
    authorize(sections.projects,[actions.manage]),
    asyncHandler(project.create)
)
router.delete("/:projectId",
    validateObjectId("projectId"),
    authorize(sections.projects,[actions.manage]),
    asyncHandler(project.remove)
)
router.put("/:projectId",
    validateObjectId("projectId"),
    validate(updateProjectSchema),
    authorize(sections.projects,[actions.update]),
    asyncHandler(project.update)
)
export default router;