import express from "express";
import asyncHandler from "../middlewares/asyncHandler.js";
import validateObjectId from "../middlewares/validateObjectId.js";
import packages from "../controllers/package.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createPackageSchema, updatePackageSchema } from "../validation/package.validation.js";

const router = express.Router();

router.get("/",asyncHandler(packages.getAll))
router.get("/:packageId",
    validateObjectId("packageId"),
    asyncHandler(packages.getOne)
)
router.post("/",
    validate(createPackageSchema),
    asyncHandler(packages.create)
)
router.delete("/:packageId",
    validateObjectId("packageId"),
    asyncHandler(packages.remove)
)
router.put("/:packageId",
    validateObjectId("packageId"),
    validate(updatePackageSchema),
    asyncHandler(packages.update)
)
export default router;