const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const { localAuthMiddleware } = require("../middleware/auth.middleware");

router.post("/login", localAuthMiddleware, authController.login);
router.post("/signup", authController.signUp);

module.exports = router;
