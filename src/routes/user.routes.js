import express from "express";
import validateObjectId from "../middlewares/validateObjectId.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import userController from "../controllers/user.controller.js";

const router = express.Router();
router.get("/",asyncHandler(userController.getAll))
router.get("/:id",
    validateObjectId,
    asyncHandler(userController.getOne)
)
router.post("/",asyncHandler(userController.create))
router.put("/:id",
    validateObjectId,
    asyncHandler(userController.update)
)
router.delete("/:id",
    validateObjectId,
    asyncHandler(userController.remove)
)
export default router