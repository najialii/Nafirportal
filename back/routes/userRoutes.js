const express = require('express')
const { authMiddleware, roleMiddleware } = require('../middleware/requireauth');
const {
    signUp,
    login,
    approveMentor,
    getAccountsByApprovalStatus,
    getCurrentUser
} = require('../controllers/usersController')

const router = express.Router();

router.post('/login', login)

router.post('/signup', signUp)

router.patch('/approve-mentor/:id', authMiddleware, roleMiddleware('admin'), approveMentor);

router.get('/accountsbystatus', authMiddleware, roleMiddleware('admin'), getAccountsByApprovalStatus);

router.get('/me', authMiddleware, getCurrentUser);

module.exports = router

