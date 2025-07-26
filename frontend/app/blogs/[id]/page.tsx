"use client"
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleBlog } from '../../../redux/slices/blogSlice';
import { AppDispatch } from '../../../redux/store';
import { useParams } from 'next/navigation';
import Head from 'next/head';
import Image from 'next/image';

const BlogDetail: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams();
  const { id } = params;

  // Select the blog and status from Redux store
  const blog = useSelector((state: any) => state.blog.singleBlog);
  const status = useSelector((state: any) => state.blog.status);

  // Fetch blog details
  useEffect(() => {
    if (id) {
      const blogId = Array.isArray(id) ? id[0] : id;
      dispatch(getSingleBlog(blogId));
    }
  }, [dispatch, id]);

  // Loading state
  if (status === 'loading') {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading blog post...</p>
      </div>
    );
  }

  // Not found state
  if (!blog) {
    return (
      <div className="not-found-container">
        <h1>Blog Not Found</h1>
        <p>The blog post you're looking for doesn't exist or may have been removed.</p>
        <a href="/" className="home-link">Return to Homepage</a>
      </div>
    );
  }

  // Format date if available
  const formattedDate = blog.createdAt
    ? new Date(blog.createdAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
    : '';

  return (
    <>
      <Head>
        <title>{blog.metaTitle || blog.title}</title>
        <meta name="description" content={blog.metaDescription} />
        <meta property="og:title" content={blog.metaTitle || blog.title} />
        <meta property="og:description" content={blog.metaDescription} />
        {blog.imagePath && <meta property="og:image" content={blog.imagePath} />}
      </Head>

      <article className="blog-detail-container">
        <header className="blog-header">
          <div className="breadcrumb">
            <a href="/">Home</a> &gt; <span>{blog.title}</span>
          </div>
          <h1 className="blog-title">{blog.title}</h1>
          {formattedDate && (
            <div className="blog-meta">
              <time dateTime={blog.createdAt}>{formattedDate}</time>
            </div>
          )}
        </header>

        {blog.imagePath && (
          <div className="featured-image-container">
            <Image
              src={blog.imagePath}
              alt={blog.title}
              width={1200}
              height={630}
              className="featured-image"
              priority
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/default-blog-image.jpg';
              }}
            />
          </div>
        )}

        <div className="blog-content">
          <div
            className="blog-description"
            dangerouslySetInnerHTML={{ __html: blog.description }}
          />

          <div className="blog-seo-meta">
            <div className="seo-meta-item">
              <h3>Meta Title</h3>
              <p>{blog.metaTitle}</p>
            </div>
            <div className="seo-meta-item">
              <h3>Meta Description</h3>
              <p>{blog.metaDescription}</p>
            </div>
          </div>
        </div>

        <footer className="blog-footer">
          <a href="/" className="back-link">← Back to all posts</a>
        </footer>
      </article>
    </>
  );
};

export default BlogDetail;