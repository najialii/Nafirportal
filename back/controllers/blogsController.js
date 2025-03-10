const Blogs = require('../models/blogsmod');
const User = require('../models/userModle');

// Create a new blog
const createBlog = async (req, res) => {
    try {
        const { title, content, authorId } = req.body;

        if (!title || !content || !authorId) {
            return res.status(400).json({ error: "All fields are required." });
        }

        const newBlog = new Blogs({
            title,
            content,
            author: authorId
        });

        await newBlog.save();

        res.status(201).json({ message: "Blog created successfully!", blog: newBlog });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all blogs
const getBlogs = async (req, res) => {
    try {
        const blogs = await Blogs.find().populate('author', 'name email');
        res.status(200).json(blogs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update a blog
const updateBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;

        const updatedBlog = await Blogs.findByIdAndUpdate(
            id,
            { title, content },
            { new: true, runValidators: true }
        );

        if (!updatedBlog) {
            return res.status(404).json({ error: "Blog not found." });
        }

        res.status(200).json({ message: "Blog updated successfully!", blog: updatedBlog });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete a blog
const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedBlog = await Blogs.findByIdAndDelete(id);

        if (!deletedBlog) {
            return res.status(404).json({ error: "Blog not found." });
        }

        res.status(200).json({ message: "Blog deleted successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { createBlog, getBlogs, updateBlog, deleteBlog };
