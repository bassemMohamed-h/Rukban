import express from "express";
import asyncHandler from "../middlewares/asyncHandler.js";
import matrialController from "../controllers/material.controller.js"
import  validateObjectId from "../middlewares/validateObjectId.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createMaterialSchema, updateMaterialSchema } from "../validation/material.validation.js";
const router = express.Router();

router.get("/",asyncHandler(matrialController.getAll))
router.get("/:id",
    validateObjectId,
    asyncHandler(matrialController.getOne))

router.post("/",
    validate(createMaterialSchema),
    asyncHandler(matrialController.create))
router.delete("/:id",
    validateObjectId,
    asyncHandler(matrialController.remove))
router.put("/:id",
    validateObjectId,
    validate(updateMaterialSchema),
    asyncHandler(matrialController.updateArrays))



export default router;