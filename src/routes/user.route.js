const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

router.get("/data", userController.getData);
router.put("/update-data", userController.updateData);
router.get("/dashboard", userController.getDashboard);

router.post("/request-blood", userController.requestBlood);
router.get("/get-requests", userController.getRequests);
router.get("/get-request/:id", userController.getRequest);

router.post("/send-message/:id", userController.sendMessage);
router.get("/get-messages/:id", userController.getMessages);

//edit
router.delete("/delete-request/:id", userController.deleteRequest);


module.exports = router;
