import express from "express";
import asyncHandler from "../middlewares/asyncHandler.js";
import validateObjectId from "../middlewares/validateObjectId.js";
import supplier from "../controllers/supplier.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createSupplierSchema, updateSupplierSchema } from "../validation/supplier.validation.js";
import { actions, authorize, sections } from "../middlewares/authorization.middleware.js";
const router = express.Router();
router.get("/",
    authorize(sections.suppliers,[actions.display]),
    asyncHandler(supplier.getAll)
)
router.get("/:supplierId",
    validateObjectId("supplierId"),
    authorize(sections.suppliers,[actions.display]),
    asyncHandler(supplier.getOne)
)
router.post("/",
    validate(createSupplierSchema),
    authorize(sections.suppliers,[actions.manage]),
    asyncHandler(supplier.create)
)
router.delete("/:supplierId",
    validateObjectId("supplierId"),
    authorize(sections.suppliers,[actions.manage]),
    asyncHandler(supplier.remove)
)
router.put("/:supplierId",
    validateObjectId("supplierId"),
    validate(updateSupplierSchema),
    authorize(sections.suppliers,[actions.update]),
    asyncHandler(supplier.update)
)
export default router;