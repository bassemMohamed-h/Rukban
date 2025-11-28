import express from "express";
import asyncHandler from "../middlewares/asyncHandler.js";
import validateObjectId from "../middlewares/validateObjectId.js";
import service from "../controllers/service.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createServiceSchema, updateServiceSchema } from "../validation/service.validation.js";

const router = express.Router();

router.get("/",asyncHandler(service.getAll))
router.get("/:serviceId",
    validateObjectId("serviceId"),
    asyncHandler(service.getOne)
)
router.post("/",
    validate(createServiceSchema),
    asyncHandler(service.create))
router.delete("/:serviceId",
    validateObjectId("serviceId"),
    asyncHandler(service.remove)
)
router.put("/:serviceId",
    validateObjectId("serviceId"),
    validate(updateServiceSchema),
    asyncHandler(service.update)
)
export default router;