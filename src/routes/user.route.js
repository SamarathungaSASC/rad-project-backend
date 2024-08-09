const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

router.get("/data", userController.getData);

router.post("/request-blood", userController.requestBlood);
router.get("/get-requests", userController.getRequests);
router.get("/get-request/:id", userController.getRequest);

module.exports = router;
