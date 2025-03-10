const express = require('express');
const router = express.Router();
const { createBlog, getBlogs, updateBlog, deleteBlog } = require('../controllers/blogsController');

router.post('/', createBlog);
router.get('/', getBlogs);
router.patch('/:id', updateBlog);
router.delete('/:id', deleteBlog);

module.exports = router;
