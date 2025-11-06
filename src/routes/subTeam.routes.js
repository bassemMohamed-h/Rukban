import express from "express";
import asyncHandler from "../middlewares/asyncHandler.js";
import validateObjectId from "../middlewares/validateObjectId.js";
import subTeam from "../controllers/subTeam.controller.js";
import {validate} from "../middlewares/validate.middleware.js";
import { createSubTeamSchema, updateSubTeamSchema } from "../validation/subTeam.validation.js";

const app = express.Router();

app.get("/",asyncHandler(subTeam.getAll))
app.get("/:id",
    validateObjectId,
    asyncHandler(subTeam.getOne)
)
app.post("/",
    validate(createSubTeamSchema),
    asyncHandler(subTeam.create))
app.delete("/:id",
    validateObjectId,
    asyncHandler(subTeam.remove)
)
app.put("/:id",
    validateObjectId,
    validate(updateSubTeamSchema),
    asyncHandler(subTeam.updateArrays)
)
export default app;