import express from "express";
import clientController from "../controllers/client.controller.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import validateObjectId from "../middlewares/validateObjectId.js";
const router = express.Router();

router.get("/",asyncHandler(clientController.getAll));
router.get("/:id",
    validateObjectId,
    asyncHandler(clientController.getOne)
)

router.post("/",asyncHandler(clientController.create));
router.put("/:id",
    validateObjectId,
    asyncHandler(clientController.updateArrays));
router.delete("/:id",
    validateObjectId,
    asyncHandler(clientController.remove)
)




export default router