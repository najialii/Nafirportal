const express = require("express");
const router = express.Router()
const {followUser, getFollowers, getFollowing, unFollow } = require('../controllers/connectionCon')





// router.post('/follow', authenticateUser, followUser);


router.post('/', followUser)
router.get('/:userId', getFollowers)
router.get('/following/:userId', getFollowing)

router.post('/unfollow/:userId', getFollowing)


module.exports = router