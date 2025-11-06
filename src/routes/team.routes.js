import express from "express"
import asyncHandler from "../middlewares/asyncHandler.js"
import teamController from "../controllers/team.controller.js"
import validateObjectId from "../middlewares/validateObjectId.js"
import {validate} from "../middlewares/validate.middleware.js"
import {createTeamSchema, updateTeamSchema} from "../validation/team.validation.js"
const app = express.Router();

app.get("/",asyncHandler(teamController.getAll))
app.get("/:id",
    validateObjectId,
    asyncHandler(teamController.getOne)
)
app.post("/",
    validate(createTeamSchema),
    asyncHandler(teamController.create))
app.delete("/:id",
    validateObjectId,
    asyncHandler(teamController.remove)
)
app.put("/:id",
    validateObjectId,
    validate(updateTeamSchema),
    asyncHandler(teamController.updateArrays)
)
export default app;