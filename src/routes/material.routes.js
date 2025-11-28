import express from "express";
import asyncHandler from "../middlewares/asyncHandler.js";
import matrialController from "../controllers/material.controller.js"
import  validateObjectId from "../middlewares/validateObjectId.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createMaterialSchema, updateMaterialSchema } from "../validation/material.validation.js";
const router = express.Router();

router.get("/",asyncHandler(matrialController.getAll))
router.get("/:materialId",
    validateObjectId("materialId"),
    asyncHandler(matrialController.getOne)
)
router.post("/",
    validate(createMaterialSchema),
    asyncHandler(matrialController.create)
)
router.delete("/:materialId",
    validateObjectId("materialId"),
    asyncHandler(matrialController.remove)
)
router.put("/:materialId",
    validateObjectId("materialId"),
    validate(updateMaterialSchema),
    asyncHandler(matrialController.update)
)
export default router;