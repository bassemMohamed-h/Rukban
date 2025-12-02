import express from "express";
import clientController from "../controllers/client.controller.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import validateObjectId from "../middlewares/validateObjectId.js";
import {validate} from "../middlewares/validate.middleware.js"
import { createClientSchema, updateClientSchema } from "../validation/client.validation.js";
import { actions, authorize, sections } from "../middlewares/authorization.middleware.js";
const router = express.Router();
router.get("/",
    authorize(sections.clients,[actions.display]),
    asyncHandler(clientController.getAll)
);
router.get("/:clientId",
    validateObjectId("clientId"),
    authorize(sections.clients,[actions.display]),
    asyncHandler(clientController.getOne)
)
router.post("/",
    validate(createClientSchema),
    authorize(sections.clients,[actions.manage]),
    asyncHandler(clientController.create)
);
router.delete("/:clientId",
    validateObjectId("clientId"),
    authorize(sections.clients,[actions.manage]),
    asyncHandler(clientController.remove)
)
router.put("/:clientId",
    validateObjectId("clientId"),
    validate(updateClientSchema),
    authorize(sections.clients,[actions.update]),
    asyncHandler(clientController.update)
);
export default router