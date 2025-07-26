import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import '../styles/BlogCard.css';

interface Blog {
    id: number;
    title: string;
    description: string;
    imagePath: string;
}

const BlogCard: React.FC<{ blog: Blog }> = ({ blog }) => {
    // Truncate description if too long
    const truncatedDesc = blog.description.length > 100
        ? `${blog.description.substring(0, 100)}...`
        : blog.description;

    return (
        <article className="blog-card">
            <div className="card-image-container">
                {blog.imagePath ? (
                    <Image
                        src={blog.imagePath}
                        alt={blog.title}
                        width={400}
                        height={250}
                        className="card-image"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = '/default-blog-image.jpg';
                        }}
                    />
                ) : (
                    <div className="image-placeholder">No Image</div>
                )}
            </div>

            <div className="card-content">
                <h2 className="card-title">{blog.title}</h2>
                <p className="card-description">{truncatedDesc}</p>
                <Link href={`/blogs/${blog.id}`} className="read-more-btn">
                    Read More
                    <svg xmlns="http://www.w3.org/2000/svg" className="arrow-icon" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </Link>
            </div>
        </article>
    );
};

export default BlogCard;