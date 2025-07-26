"use client"
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createBlog } from '../redux/slices/blogSlice';
import { AppDispatch } from '../redux/store';

const BlogForm: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        metaTitle: '',
        metaDescription: '',
        image: null as File | null
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        setFormData(prev => ({ ...prev, image: file }));

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setPreviewImage(null);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const formPayload = new FormData();
            if (formData.image) formPayload.append('image', formData.image);
            formPayload.append('title', formData.title);
            formPayload.append('description', formData.description);
            formPayload.append('metaTitle', formData.metaTitle);
            formPayload.append('metaDescription', formData.metaDescription);

            await dispatch(createBlog(formPayload)).unwrap();

            // Reset form after successful submission
            setFormData({
                title: '',
                description: '',
                metaTitle: '',
                metaDescription: '',
                image: null
            });
            setPreviewImage(null);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit} className="blog-form">
                <h2 className="form-title">Create New Blog Post</h2>

                <div className="form-group">
                    <label htmlFor="title">Blog Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Blog Content</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="form-textarea"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="image">Featured Image</label>
                    <div className="image-upload-container">
                        {previewImage ? (
                            <div className="image-preview">
                                <img src={previewImage} alt="Preview" className="preview-image" />
                                <button
                                    type="button"
                                    className="remove-image-btn"
                                    onClick={() => {
                                        setFormData(prev => ({ ...prev, image: null }));
                                        setPreviewImage(null);
                                    }}
                                >
                                    Remove Image
                                </button>
                            </div>
                        ) : (
                            <label className="file-upload-label">
                                <input
                                    type="file"
                                    id="image"
                                    name="image"
                                    onChange={handleImageChange}
                                    accept="image/*"
                                    className="file-input"
                                />
                                <div className="upload-area">
                                    <svg className="upload-icon" viewBox="0 0 24 24">
                                        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                                    </svg>
                                    <span>Click to upload image</span>
                                </div>
                            </label>
                        )}
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="metaTitle">Meta Title (for SEO)</label>
                    <input
                        type="text"
                        id="metaTitle"
                        name="metaTitle"
                        value={formData.metaTitle}
                        onChange={handleChange}
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="metaDescription">Meta Description (for SEO)</label>
                    <textarea
                        id="metaDescription"
                        name="metaDescription"
                        value={formData.metaDescription}
                        onChange={handleChange}
                        rows={3}
                        className="form-textarea"
                    />
                </div>

                <button
                    type="submit"
                    className="submit-btn"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Publishing...' : 'Publish Blog Post'}
                </button>
            </form>
        </div>
    );
};

export default BlogForm;