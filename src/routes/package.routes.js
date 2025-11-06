import express from "express";
import asyncHandler from "../middlewares/asyncHandler.js";
import validateObjectId from "../middlewares/validateObjectId.js";
import packages from "../controllers/package.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createPackageSchema, updatePackageSchema } from "../validation/package.validation.js";

const app = express.Router();

app.get("/",asyncHandler(packages.getAll))
app.get("/:id",
    validateObjectId,
    asyncHandler(packages.getOne)
)
app.post("/",
    validate(createPackageSchema),
    asyncHandler(packages.create))
app.delete("/:id",
    validateObjectId,
    asyncHandler(packages.remove)
)
app.put("/:id",
    validateObjectId,
    validate(updatePackageSchema),
    asyncHandler(packages.updateArrays)
)
export default app;