const router = require("express").Router();
const authController = require("../controllers/auth.controller");
router.patch("/signup",authController.signup);
router.post("/signin", authController.signin);

module.exports = router;
