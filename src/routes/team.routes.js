import express from "express"
import asyncHandler from "../middlewares/asyncHandler.js"
import teamController from "../controllers/team.controller.js";
import validateObjectId from "../middlewares/validateObjectId.js"
const app = express.Router();

app.get("/",asyncHandler(teamController.getAll))
app.get("/:id",
    validateObjectId,
    asyncHandler(teamController.getOne)
)
app.post("/",asyncHandler(teamController.create))
app.delete("/:id",
    validateObjectId,
    asyncHandler(teamController.remove)
)
app.put("/:id",
    validateObjectId,
    asyncHandler(teamController.updateArrays)
)
export default app;