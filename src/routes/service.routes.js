import express from "express";
import asyncHandler from "../middlewares/asyncHandler.js";
import validateObjectId from "../middlewares/validateObjectId.js";
import service from "../controllers/service.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createServiceSchema, updateServiceSchema } from "../validation/service.validation.js";

const app = express.Router();

app.get("/",asyncHandler(service.getAll))
app.get("/:id",
    validateObjectId,
    asyncHandler(service.getOne)
)
app.post("/",
    validate(createServiceSchema),
    asyncHandler(service.create))
app.delete("/:id",
    validateObjectId,
    asyncHandler(service.remove)
)
app.put("/:id",
    validateObjectId,
    validate(updateServiceSchema),
    asyncHandler(service.updateArrays)
)
export default app;