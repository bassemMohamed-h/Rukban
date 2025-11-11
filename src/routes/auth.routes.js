import express from "express";
import { validate } from "../middlewares/validate.middleware.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import authController from "../controllers/auth.controller.js"
import { signinAuthSchema, signupAuthSchema } from "../validation/auth.validation.js";


const router = express.Router();

router.patch("/signup",
    validate(signupAuthSchema),
    asyncHandler(authController.signup)
);
router.post("/signin", 
    validate(signinAuthSchema),
    asyncHandler(authController.signin)
);

export default router;