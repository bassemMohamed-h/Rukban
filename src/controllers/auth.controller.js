import asyncHandler from"../middlewares/asyncHandler.js";
import authService from"../services/auth.service.js";

const signup = asyncHandler(async (req, res) => {
  const result = await authService.signup(req.body);
  res.status(201).json({ success: true, data: result });
});

const signin = asyncHandler(async (req, res) => {
  const result = await authService.signin(req.body);
  res.status(200).json({ success: true, data: result });
});
export default {signin,signup}