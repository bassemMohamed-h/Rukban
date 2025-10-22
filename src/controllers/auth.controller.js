const asyncHandler = require("../middlewares/asyncHandler");
const authService = require("../services/auth.service");

exports.signup = asyncHandler(async (req, res) => {
  const result = await authService.signup(req.body);
  res.status(201).json({ success: true, data: result });
});

exports.signin = asyncHandler(async (req, res) => {
  const result = await authService.signin(req.body);
  res.status(200).json({ success: true, data: result });
});
