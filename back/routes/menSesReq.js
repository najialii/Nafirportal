const express = require("express");
const { requestMentorship, getMentorshipRequests } = require("../controllers/menSesReqController"); 
const { authMiddleware, roleMiddleware } = require('../middleware/requireauth');

const router = express.Router();


router.post("/", authMiddleware, roleMiddleware('admin', 'mentor', 'mentee'), requestMentorship);


router.get("/", authMiddleware, roleMiddleware('admin'), getMentorshipRequests);

module.exports = router;
