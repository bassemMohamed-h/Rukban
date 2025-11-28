import express from "express";
import asyncHandler from "../middlewares/asyncHandler.js";
import validateObjectId from "../middlewares/validateObjectId.js";
import project from "../controllers/project.controller.js";
import {validate} from "../middlewares/validate.middleware.js"
import { createProjectSchema, updateProjectSchema } from "../validation/project.validation.js";
const app = express.Router();

app.get("/",asyncHandler(project.getAll))
app.get("/:projectId",
    validateObjectId("projectId"),
    asyncHandler(project.getOne)
)
app.post("/",
    validate(createProjectSchema),
    asyncHandler(project.create))
app.delete("/:projectId",
    validateObjectId("projectId"),
    asyncHandler(project.remove)
)
app.put("/:projectId",
    validateObjectId("projectId"),
    validate(updateProjectSchema),
    asyncHandler(project.update)
)
export default app;