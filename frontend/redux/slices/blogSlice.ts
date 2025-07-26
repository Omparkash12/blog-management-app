import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Define your Blog type
interface Blog {
  id: number;
  title: string;
  description: string;
  imagePath: string;
  metaTitle: string;
  metaDescription: string;
}

interface BlogState {
  blogs: Blog[];
  singleBlog: Blog | null; // To store a single blog when fetched
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: BlogState = {
  blogs: [],
  singleBlog: null,
  status: 'idle',
};

// Get the base API URL from environment variables
const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Fetch all blogs
export const fetchBlogs = createAsyncThunk('blog/fetchBlogs', async () => {
  const response = await fetch(`${API_URL}/api/blogs`);
  const data = await response.json();
  return data;
});

// Fetch a single blog by ID or slug
export const getSingleBlog = createAsyncThunk(
  'blog/getSingleBlog',
  async (id: number | string) => {
    const response = await fetch(`${API_URL}/api/blogs/${id}`);
    const data = await response.json();
    return data;
  }
);

// Create a new blog (using FormData)
export const createBlog = createAsyncThunk(
  'blog/createBlog',
  async (formData: FormData) => {
    const response = await fetch(`${API_URL}/api/blogs`, {
      method: 'POST',
      body: formData, // Send FormData as the body of the request
    });
    const data = await response.json();
    return data;
  }
);

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handling fetchBlogs
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.blogs = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state) => {
        state.status = 'failed';
      })
      // Handling getSingleBlog
      .addCase(getSingleBlog.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getSingleBlog.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.singleBlog = action.payload;
      })
      .addCase(getSingleBlog.rejected, (state) => {
        state.status = 'failed';
      })
      // Handling createBlog
      .addCase(createBlog.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.blogs.push(action.payload);
      })
      .addCase(createBlog.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default blogSlice.reducer;
