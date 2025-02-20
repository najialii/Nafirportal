const express = require('express');
const router = express.Router();
const {
    createMentorSession,
    getMentorSessions,
    getSingleMentorSession,
    deleteMentorSession,
    updateMentorSession
} = require('../controllers/mentorsessionsController');

const requireAuth = require('../middleware/requireauth')
//require auth for all of the routes 
// router.use(requireAuth)

router.get('/', getMentorSessions);

router.get('/:id', getSingleMentorSession);

router.post('/', createMentorSession);

router.put('/:id', updateMentorSession);

router.delete('/:id', deleteMentorSession);

module.exports = router;
