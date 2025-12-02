import express from "express";
import validateObjectId from "../middlewares/validateObjectId.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import userController from "../controllers/user.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { updateUserSchema } from "../validation/user.validation.js";
import { actions, authorize, sections } from "../middlewares/authorization.middleware.js";
const router = express.Router();
router.get("/",
    authorize(sections.users,[actions.display]),
    asyncHandler(userController.getAll)
)
router.get("/:userId",
    validateObjectId("userId"),
    authorize(sections.users,[actions.display]),
    asyncHandler(userController.getOne)
)
router.put("/:userId",
    validateObjectId("userId"),
    validate(updateUserSchema),
    authorize(sections.users,[actions.update]),
    asyncHandler(userController.update)
)
router.delete("/:userId",
    validateObjectId("userId"),
    authorize(sections.users,[actions.delete]),
    asyncHandler(userController.remove)
)
export default router