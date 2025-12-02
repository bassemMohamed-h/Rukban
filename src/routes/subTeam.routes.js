import express from "express";
import asyncHandler from "../middlewares/asyncHandler.js";
import validateObjectId from "../middlewares/validateObjectId.js";
import subTeam from "../controllers/subTeam.controller.js";
import {validate} from "../middlewares/validate.middleware.js";
import { createSubTeamSchema, updateSubTeamSchema } from "../validation/subTeam.validation.js";
import { actions, authorize, sections } from "../middlewares/authorization.middleware.js";
const app = express.Router();
app.get("/",
    authorize(sections.subTeams,[actions.display]),
    asyncHandler(subTeam.getAll))
app.get("/:subTeamId",
    validateObjectId("subTeamId"),
    authorize(sections.subTeams,[actions.display]),
    asyncHandler(subTeam.getOne)
)
app.post("/",
    validate(createSubTeamSchema),
    authorize(sections.subTeams,[actions.manage]),
    asyncHandler(subTeam.create))
app.delete("/:subTeamId",
    validateObjectId("subTeamId"),
    authorize(sections.subTeams,[actions.manage]),
    asyncHandler(subTeam.remove)
)
app.put("/:subTeamId",
    validateObjectId("subTeamId"),
    validate(updateSubTeamSchema),
    authorize(sections.subTeams,[actions.update]),
    asyncHandler(subTeam.update)
)
export default app;