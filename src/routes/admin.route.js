const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controller");

router.get("/get-requests", adminController.getRequests);
router.get("/get-request/:id", adminController.getRequest);
router.post("/accept-request/:id", adminController.acceptRequest);

module.exports = router;
