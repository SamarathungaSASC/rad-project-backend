const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

router.get("/data", userController.getData);

module.exports = router;
