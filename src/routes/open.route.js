const express = require("express");
const router = express.Router();
const openController = require("../controllers/open.controller");

router.post("/join-campaign/:campaignId", openController.joinCampaign);
router.post("/leave-campaign/:campaignId", openController.leaveCampaign);
router.get("/get-campaigns", openController.getCampaigns);
router.get("/get-campaign/:id", openController.getCampaign);
router.get("/get-upcoming-campaigns", openController.upcomingCampaigns);

router.post("/contact", openController.contactUs);


module.exports = router;
