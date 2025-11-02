import express from "express";
import asyncHandler from "../middlewares/asyncHandler.js";
import validateObjectId from "../middlewares/validateObjectId.js";
import task from "../controllers/task.controller.js";

const app = express.Router();

app.get("/",asyncHandler(task.getAll))
app.get("/:id",
    validateObjectId,
    asyncHandler(task.getOne)
)
app.post("/",asyncHandler(task.create))
app.delete("/:id",
    validateObjectId,
    asyncHandler(task.remove)
)
app.put("/:id",
    validateObjectId,
    asyncHandler(task.updateArrays)
)
export default app;