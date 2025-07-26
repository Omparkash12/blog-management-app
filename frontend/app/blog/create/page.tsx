import BlogForm from '../../../components/BlogForm';

const CreateBlog: React.FC = () => {
    return (
        <div className="create-blog-page">
            <div className="page-header">
                <h1>Create a New Blog Post</h1>
                <p className="page-description">Share your knowledge and ideas with the world</p>
            </div>
            <BlogForm />
        </div>
    );
};

export default CreateBlog;