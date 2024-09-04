const express = require("express");
const router = express.Router();
const openController = require("../controllers/open.controller");

router.post("/join-campaign/:campaignId", openController.joinCampaign);
router.get("/get-campaigns", openController.getCampaigns);
router.get("/get-campaign/:id", openController.getCampaign);
router.get("/get-upcoming-campaigns", openController.upcomingCampaigns);

router.get("/contact", openController.contactUs);


module.exports = router;
