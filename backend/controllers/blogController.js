const blogService = require('../services/blogService');

const createBlog = async (req, res) => {
    try {
        const { title, description, metaTitle, metaDescription } = req.body;
        const blog = await blogService.createBlog(
            title,
            description,
            metaTitle,
            metaDescription,
            req.file
        );
        res.status(201).json(blog);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getAllBlogs = async (req, res) => {
    try {
        const blogs = await blogService.getAllBlogs();
        res.status(200).json(blogs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getSingleBlog = async (req, res) => {
    try {
        const blog = await blogService.getSingleBlog(req.params.id);
        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }
        res.status(200).json(blog);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { createBlog, getAllBlogs, getSingleBlog };
