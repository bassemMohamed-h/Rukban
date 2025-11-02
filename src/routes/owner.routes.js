import express from "express";
import asyncHandler from "../middlewares/asyncHandler.js"
import ownerController from "../controllers/owner.controller.js"
import validateObjectId from "../middlewares/validateObjectId.js";

const router = express.Router();

router.get("/",asyncHandler(ownerController.getAll))
router.get("/:id",
    validateObjectId,
    asyncHandler(ownerController.getOne))

router.post("/",asyncHandler(ownerController.create))
router.delete("/:id",
    validateObjectId,
    asyncHandler(ownerController.remove))
router.put("/:id",
    validateObjectId,
    asyncHandler(ownerController.updateArrays))



export default router;