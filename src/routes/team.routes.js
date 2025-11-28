import express from "express"
import asyncHandler from "../middlewares/asyncHandler.js"
import teamController from "../controllers/team.controller.js"
import validateObjectId from "../middlewares/validateObjectId.js"
import {validate} from "../middlewares/validate.middleware.js"
import {createTeamSchema, updateTeamSchema} from "../validation/team.validation.js"
import { actions, authorize, sections } from "../middlewares/authorization.middleware.js"
const app = express.Router();

app.get("/",
    authorize(sections.teams,actions.display),
    asyncHandler(teamController.getAll))
app.get("/:teamId",
    validateObjectId("teamId"),
    authorize(sections.teams,actions.display),
    asyncHandler(teamController.getOne)
)
app.post("/",
    validate(createTeamSchema),
    authorize(sections.teams,actions.manage),
    asyncHandler(teamController.create))
app.delete("/:teamId",
    validateObjectId("teamId"),
    authorize(sections.teams,actions.manage),
    asyncHandler(teamController.remove)
)
app.put("/:teamId",
    validateObjectId("teamId"),
    validate(updateTeamSchema),
    authorize(sections.teams,actions.update),
    asyncHandler(teamController.update)
)
export default app;