const express = require('express');
const router = express.Router();
const { createBlog, getBlogs, updateBlog, deleteBlog, getSIgBlog } = require('../controllers/blogsController');
const { authMiddleware } = require('../middleware/requireauth');


router.get('/', getBlogs);
router.get('/:id', getSIgBlog);
router.use(authMiddleware)
router.post('/', createBlog);
router.patch('/:id', updateBlog);
router.delete('/:id', deleteBlog);

module.exports = router;
