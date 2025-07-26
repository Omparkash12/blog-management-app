const express = require('express');
const { createBlog, getAllBlogs, getSingleBlog } = require('../controllers/blogController');
const { upload } = require('../utils/fileUpload');

const router = express.Router();

router.post('/blogs', upload.single('image'), createBlog);
router.get('/blogs', getAllBlogs);
router.get('/blogs/:id', getSingleBlog);

module.exports = router;
