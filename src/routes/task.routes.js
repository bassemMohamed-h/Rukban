import express from "express";
import asyncHandler from "../middlewares/asyncHandler.js";
import validateObjectId from "../middlewares/validateObjectId.js";
import task from "../controllers/task.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createTaskSchema, updateTaskSchema } from "../validation/task.validation.js";

const app = express.Router();

app.get("/",asyncHandler(task.getAll))
app.get("/:id",
    validateObjectId,
    asyncHandler(task.getOne)
)
app.post("/",
    validate(createTaskSchema),
    asyncHandler(task.create))
app.delete("/:id",
    validateObjectId,
    asyncHandler(task.remove)
)
app.put("/:id",
    validateObjectId,
    validate(updateTaskSchema),
    asyncHandler(task.updateArrays)
)
export default app;