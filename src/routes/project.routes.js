import express from "express";
import asyncHandler from "../middlewares/asyncHandler.js";
import validateObjectId from "../middlewares/validateObjectId.js";
import project from "../controllers/project.controller.js";

const app = express.Router();

app.get("/",asyncHandler(project.getAll))
app.get("/:id",
    validateObjectId,
    asyncHandler(project.getOne)
)
app.post("/",asyncHandler(project.create))
app.delete("/:id",
    validateObjectId,
    asyncHandler(project.remove)
)
app.put("/:id",
    validateObjectId,
    asyncHandler(project.updateArrays)
)
export default app;