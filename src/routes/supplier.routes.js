import express from "express";
import asyncHandler from "../middlewares/asyncHandler.js";
import validateObjectId from "../middlewares/validateObjectId.js";
import supplier from "../controllers/supplier.controller.js";

const app = express.Router();

app.get("/",asyncHandler(supplier.getAll))
app.get("/:id",
    validateObjectId,
    asyncHandler(supplier.getOne)
)
app.post("/",asyncHandler(supplier.create))
app.delete("/:id",
    validateObjectId,
    asyncHandler(supplier.remove)
)
app.put("/id",
    validateObjectId,
    asyncHandler(supplier.updateArrays)
)
export default app;