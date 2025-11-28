import express from "express";
import asyncHandler from "../middlewares/asyncHandler.js";
import validateObjectId from "../middlewares/validateObjectId.js";
import supplier from "../controllers/supplier.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createSupplierSchema, updateSupplierSchema } from "../validation/supplier.validation.js";

const router = express.Router();

router.get("/",asyncHandler(supplier.getAll))
router.get("/:supplierId",
    validateObjectId("supplierId"),
    asyncHandler(supplier.getOne)
)
router.post("/",
    validate(createSupplierSchema),
    asyncHandler(supplier.create))
router.delete("/:supplierId",
    validateObjectId("supplierId"),
    asyncHandler(supplier.remove)
)
router.put("/:supplierId",
    validateObjectId("supplierId"),
    validate(updateSupplierSchema),
    asyncHandler(supplier.update)
)
export default router;