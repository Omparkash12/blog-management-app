const Blog = require('../models/blogModel');
const { uploadImage } = require('../utils/fileUpload');

// Create a new blog
const createBlog = async (title, description, metaTitle, metaDescription, file) => {
    const imagePath = await uploadImage(file);
    const blog = await Blog.create({
        title,
        description,
        imagePath,
        metaTitle,
        metaDescription,
    });
    return blog;
};

// Get all blogs
const getAllBlogs = async () => {
    const blogs = await Blog.findAll();
    return blogs;
};

// Get a single blog by ID
const getSingleBlog = async (id) => {
    const blog = await Blog.findOne({ where: { id } });
    return blog;
};

module.exports = { createBlog, getAllBlogs, getSingleBlog };
