const express = require("express");
const router = express.Router();
const openController = require("../controllers/open.controller");

router.post("/join-campaign/:id", openController.joinCampaign);

module.exports = router;
