import express from "express";
import asyncHandler from "../middlewares/asyncHandler.js"

const router = express.Router();

router.get("/",asyncHandler())



export default router;