import express from "express";
import asyncHandler from "../middlewares/asyncHandler.js";
import validateObjectId from "../middlewares/validateObjectId.js";
import supplier from "../controllers/supplier.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createSupplierSchema, updateSupplierSchema } from "../validation/supplier.validation.js";

const app = express.Router();

app.get("/",asyncHandler(supplier.getAll))
app.get("/:id",
    validateObjectId,
    asyncHandler(supplier.getOne)
)
app.post("/",
    validate(createSupplierSchema),
    asyncHandler(supplier.create))
app.delete("/:id",
    validateObjectId,
    asyncHandler(supplier.remove)
)
app.put("/:id",
    validateObjectId,
    validate(updateSupplierSchema),
    asyncHandler(supplier.updateArrays)
)
export default app;