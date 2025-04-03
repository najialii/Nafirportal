const express = require('express');
const router = express.Router();
const { authMiddleware, roleMiddleware } = require('../middleware/requireauth');
const paginationMidWear = require('../middleware/paginationMidware')
const MentorSession = require('../models/mentorSessionsModel');
const {
    createMentorSession,
    getMentorSessions,
    getSingleMentorSession,
    deleteMentorSession,
    updateMentorSession,
    getAllMentorSessions,
    getSessionByStatus
} = require('../controllers/mentorsessionsController');

 

router.use(authMiddleware)
router.get('/',authMiddleware, getMentorSessions);

// router.get('/api/mentorsessions',authMiddleware, paginationMidWear(MentorSession), getMentorSessions);


router.get('/:id', getSingleMentorSession);
router.get('/', getAllMentorSessions);
router.get('/bystat/:id', getSessionByStatus);

router.post('/',roleMiddleware('admin', 'mentor'), createMentorSession);

router.put('/:id', updateMentorSession);

router.delete('/:id', deleteMentorSession);

module.exports = router;
