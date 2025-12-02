import express from "express";
import asyncHandler from "../middlewares/asyncHandler.js";
import validateObjectId from "../middlewares/validateObjectId.js";
import service from "../controllers/service.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createServiceSchema, updateServiceSchema } from "../validation/service.validation.js";
import { actions, authorize, sections } from "../middlewares/authorization.middleware.js";
const router = express.Router();
router.get("/",
    authorize(sections.services,[actions.display]),
    asyncHandler(service.getAll)
)
router.get("/:serviceId",
    validateObjectId("serviceId"),
    authorize(sections.services,[actions.display]),
    asyncHandler(service.getOne)
)
router.post("/",
    validate(createServiceSchema),
    authorize(sections.services,[actions.manage]),
    asyncHandler(service.create)
)
router.delete("/:serviceId",
    validateObjectId("serviceId"),
    authorize(sections.services,[actions.manage]),
    asyncHandler(service.remove)
)
router.put("/:serviceId",
    validateObjectId("serviceId"),
    validate(updateServiceSchema),
    authorize(sections.services,[actions.update]),
    asyncHandler(service.update)
)
export default router;