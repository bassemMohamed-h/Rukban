import express from "express";
import asyncHandler from "../middlewares/asyncHandler.js";
import validateObjectId from "../middlewares/validateObjectId.js";
import packages from "../controllers/package.controller.js";

const app = express.Router();

app.get("/",asyncHandler(packages.getAll))
app.get("/:id",
    validateObjectId,
    asyncHandler(packages.getOne)
)
app.post("/",asyncHandler(packages.create))
app.delete("/:id",
    validateObjectId,
    asyncHandler(packages.remove)
)
app.put("/:id",
    validateObjectId,
    asyncHandler(packages.updateArrays)
)
export default app;