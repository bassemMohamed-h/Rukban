import express from "express";
import asyncHandler from "../middlewares/asyncHandler.js";
import validateObjectId from "../middlewares/validateObjectId.js";
import packages from "../controllers/package.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createPackageSchema, updatePackageSchema } from "../validation/package.validation.js";
import { actions, authorize, sections } from "../middlewares/authorization.middleware.js";

const router = express.Router();

router.get("/",
    authorize(sections.packages,[actions.display]),
    asyncHandler(packages.getAll)
)
router.get("/:packageId",
    validateObjectId("packageId"),
    authorize(sections.packages,[actions.display]),
    asyncHandler(packages.getOne)
)
router.post("/",
    validate(createPackageSchema),
    authorize(sections.packages,[actions.manage]),
    asyncHandler(packages.create)
)
router.delete("/:packageId",
    validateObjectId("packageId"),
    authorize(sections.packages,[actions.manage]),
    asyncHandler(packages.remove)
)
router.put("/:packageId",
    validateObjectId("packageId"),
    validate(updatePackageSchema),
    authorize(sections.packages,[actions.update]),
    asyncHandler(packages.update)
)
export default router;