const express = require('express')
const router = Router.express()
const  { createBlog, getBlogs, updateBlog, deleteBlog } = require('../controllers/blogsController')


router.post('./', createBlog)
router.get('./', getBlogs)
router.patch('./', updateBlog)
router.post('./', createBlog)