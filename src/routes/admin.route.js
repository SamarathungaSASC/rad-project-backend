const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controller");
const campaignController = require("../controllers/campaign.controller");

router.get("/get-requests", adminController.getRequests);
router.get("/get-request/:id", adminController.getRequest);
router.post("/accept-request/:id", adminController.acceptRequest);

router.get("/get-messages/:id", adminController.getMessages);
router.post("/send-message/:id", adminController.sendMessage);

router.get("/dashboard-data", adminController.getDashboard);
router.post("/add-campaign", campaignController.addCampaign);
router.put("/edit-campaign/:id", campaignController.editCampaign);
router.delete("/delete-campaign/:id", campaignController.deleteCampaign);

module.exports = router;
