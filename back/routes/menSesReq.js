const express = require("express");
const { requestMentorship, getMentorshipRequests,  getMentorshipSessions } = require("../controllers/menSesReqController"); 
const { authMiddleware, roleMiddleware } = require('../middleware/requireauth');

const router = express.Router();


router.post("/", authMiddleware, roleMiddleware('admin', 'mentor', 'mentee'), requestMentorship);


router.get("/menrequests", authMiddleware, roleMiddleware('admin', 'mentor'), getMentorshipRequests);


module.exports = router;
