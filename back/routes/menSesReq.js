const express = require("express");
const { requestMentorship, getMentorshipRequests,  updateMentorshipRequestStatus, getMentorSessionsByMentor } = require("../controllers/menSesReqController"); 
const { authMiddleware, roleMiddleware } = require('../middleware/requireauth');

const router = express.Router();


router.post("/", authMiddleware, roleMiddleware('admin', 'mentor', 'mentee'), requestMentorship);


router.get("/menrequests", authMiddleware, roleMiddleware('mentor', 'admin'), getMentorshipRequests);

router.get("/mentor-sessions", authMiddleware, roleMiddleware('mentor'), getMentorSessionsByMentor);

router.patch("/update", authMiddleware, roleMiddleware('mentor'), updateMentorshipRequestStatus);

module.exports = router;
