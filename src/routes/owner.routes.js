import express from "express"
import asyncHandler from "../middlewares/asyncHandler.js";
import validateObjectId from "../middlewares/validateObjectId.js";
import ownercontroller from "../controllers/owner.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createOwnerSchema, updateOwnerSchema } from "../validation/owner.validation.js";

const app = express.Router();

app.get("/",asyncHandler(ownercontroller.getAll)),
app.get("/:id",
    validateObjectId,
    asyncHandler(ownercontroller.getOne)
)
app.post("/",
    validate(createOwnerSchema),
    asyncHandler(ownercontroller.create))
app.delete("/:id",
    validateObjectId,
    asyncHandler(ownercontroller.remove)
)
app.put("/:id",
    validateObjectId,
    validate(updateOwnerSchema),
    asyncHandler(ownercontroller.update)
)
export default app