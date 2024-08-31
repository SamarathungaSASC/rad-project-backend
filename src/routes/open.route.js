const express = require("express");
const router = express.Router();
const openController = require("../controllers/open.controller");

router.post("/join-campaign/:id", openController.joinCampaign);
router.get("/get-campaigns", openController.getCampaigns);
router.get("/get-upcoming-campaigns", openController.upcomingCampaigns);

module.exports = router;
