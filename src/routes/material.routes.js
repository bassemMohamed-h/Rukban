import express from "express";
import asyncHandler from "../middlewares/asyncHandler.js";
import matrialController from "../controllers/material.controller.js"
import  validateObjectId from "../middlewares/validateObjectId.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createMaterialSchema, updateMaterialSchema } from "../validation/material.validation.js";
import { actions, authorize, sections } from "../middlewares/authorization.middleware.js";
const router = express.Router();
router.get("/",
    authorize(sections.materials,[actions.display]),
    asyncHandler(matrialController.getAll))
router.get("/:materialId",
    validateObjectId("materialId"),
    authorize(sections.materials,[actions.display]),
    asyncHandler(matrialController.getOne)
)
router.post("/",
    validate(createMaterialSchema),
    authorize(sections.materials,[actions.manage]),
    asyncHandler(matrialController.create)
)
router.delete("/:materialId",
    validateObjectId("materialId"),
    authorize(sections.materials,[actions.manage]),
    asyncHandler(matrialController.remove)
)
router.put("/:materialId",
    validateObjectId("materialId"),
    validate(updateMaterialSchema),
    authorize(sections.materials,[actions.update]),
    asyncHandler(matrialController.update)
)
export default router;