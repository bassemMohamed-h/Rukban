import express from "express";
import asyncHandler from "../middlewares/asyncHandler.js";
import validateObjectId from "../middlewares/validateObjectId.js";
import task from "../controllers/task.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createTaskSchema, updateTaskSchema } from "../validation/task.validation.js";
import { actions, authorize, sections } from "../middlewares/authorization.middleware.js";
const app = express.Router();
app.get("/",
    authorize(sections.tasks, [actions.display]),
    asyncHandler(task.getAll)
)
app.get("/:taskId",
    validateObjectId("taskId"),
    authorize(sections.tasks, [actions.display]),
    asyncHandler(task.getOne)
)
app.post("/",
    validate(createTaskSchema),
    authorize(sections.tasks, [actions.manage]),
    asyncHandler(task.create)
)
app.delete("/:taskId",
    validateObjectId("taskId"),
    authorize(sections.tasks, [actions.manage]),
    asyncHandler(task.remove)
)
app.put("/:taskId",
    validateObjectId("taskId"),
    validate(updateTaskSchema),
    authorize(sections.tasks, [actions.update]),
    asyncHandler(task.update)
)
export default app;