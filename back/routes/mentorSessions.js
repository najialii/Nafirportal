const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/requireauth');
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



router.get('/:id', getSingleMentorSession);
router.get('/mensessions/:id', getAllMentorSessions);
router.get('/bystat/:id', getSessionByStatus);

router.post('/', createMentorSession);

router.put('/:id', updateMentorSession);

router.delete('/:id', deleteMentorSession);

module.exports = router;
