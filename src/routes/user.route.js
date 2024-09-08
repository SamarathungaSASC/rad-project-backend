const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

router.get("/data", userController.getData);
router.put("update-data", userController.updateData);

router.post("/request-blood", userController.requestBlood);
router.get("/get-requests", userController.getRequests);


module.exports = router;
