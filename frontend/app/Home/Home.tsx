"use client"
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogs } from '../../redux/slices/blogSlice';
import { AppDispatch } from '../../redux/store';
import BlogCard from '../../components/BlogCard';

const Home = () => {
    const dispatch = useDispatch<AppDispatch>();
    const blogs = useSelector((state: any) => state.blog.blogs);
    const status = useSelector((state: any) => state.blog.status);

    useEffect(() => {
        dispatch(fetchBlogs());
    }, [dispatch]);

    if (status === 'loading') {
        return (
            <div className="loading-state">
                <div className="spinner"></div>
                <p>Loading blog posts...</p>
            </div>
        );
    }

    if (blogs.length === 0) {
        return (
            <div className="empty-state">
                <svg className="empty-icon" viewBox="0 0 24 24">
                    <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
                    <path d="M12 10.5c1.38 0 2.5-1.12 2.5-2.5S13.38 5.5 12 5.5 9.5 6.62 9.5 8s1.12 2.5 2.5 2.5zM12 12c-1.66 0-5 .84-5 2.5V17h10v-2.5c0-1.66-3.34-2.5-5-2.5z" />
                </svg>
                <h3>No blog posts yet</h3>
                <p>Check back later or create a new post</p>
            </div>
        );
    }

    return (
        <div className="blog-grid">
            {blogs.map((blog: any) => (
                <BlogCard key={blog.id} blog={blog} />
            ))}
        </div>
    );
};

export default Home;