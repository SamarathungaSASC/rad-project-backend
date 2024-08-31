const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controller");
const campaignController = require("../controllers/campaign.controller");

router.get("/get-requests", adminController.getRequests);
router.get("/get-request/:id", adminController.getRequest);
router.post("/accept-request/:id", adminController.acceptRequest);
router.get("/dashboard-data", adminController.getDashboard);
router.get("/get-campaigns", campaignController.getCampaigns);
router.get("/get-upcoming-campaigns", campaignController.upcomingCampaigns);
router.post("/add-campaign", campaignController.addCampaign);
router.post("/edit-campaign/:id", campaignController.editCampaign);
router.post("/delete-campaign/:id", campaignController.deleteCampaign);

module.exports = router;
