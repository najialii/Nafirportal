const express = require('express')
const { authMiddleware, roleMiddleware } = require('../middleware/requireauth');
const {
    signUp,
    login,
    approveUsers,
    denyMentor,
    achievements,
    toggleBanUser,
    getAccountsByApprovalStatus,
    getCurrentUser, 
    getUserById,
    logout,
    getAllUsers, 
    userByDep, 
} = require('../controllers/usersController')

const router = express.Router();

router.post('/login', login)

router.post('/signup', signUp)

router.patch('/approve-mentor/:id', authMiddleware, roleMiddleware('admin'), approveUsers);
router.patch('/deny-mentor/:id', authMiddleware, roleMiddleware('admin'), denyMentor);
router.patch('/toggle-ban/:id', authMiddleware, roleMiddleware('admin'), toggleBanUser);
router.patch('/achievement', authMiddleware, achievements)

router.get('/accountsbystatus', authMiddleware, roleMiddleware('admin'), getAccountsByApprovalStatus);
router.get('/allusers', authMiddleware, roleMiddleware('admin', 'superadmin'), getAllUsers);

router.get('/me', authMiddleware, getCurrentUser);

router.get('/:id', getUserById)
// router.post('/logout', logout)
router.get('/', authMiddleware, roleMiddleware('admin', 'superadmin'), getAllUsers);


//depAdmin
router.get('/depuser/:department', authMiddleware,roleMiddleware('admin'), userByDep);
// GET /depuser?department=Marketing&role=mentee
module.exports = router

