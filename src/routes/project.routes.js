import express from "express";
import asyncHandler from "../middlewares/asyncHandler.js";
import validateObjectId from "../middlewares/validateObjectId.js";
import project from "../controllers/project.controller.js";
import {validate} from "../middlewares/validate.middleware.js"
import { createProjectSchema, updateProjectSchema } from "../validation/project.validation.js";
const app = express.Router();

app.get("/",asyncHandler(project.getAll))
app.get("/:id",
    validateObjectId,
    asyncHandler(project.getOne)
)
app.post("/",
    validate(createProjectSchema),
    asyncHandler(project.create))
app.delete("/:id",
    validateObjectId,
    asyncHandler(project.remove)
)
app.put("/:id",
    validateObjectId,
    validate(updateProjectSchema),
    asyncHandler(project.updateArrays)
)
export default app;