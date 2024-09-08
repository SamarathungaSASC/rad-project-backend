const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

router.get("/data", userController.getData);
router.put("update-data", userController.updateData);


module.exports = router;
