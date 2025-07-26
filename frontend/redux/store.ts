import { configureStore } from '@reduxjs/toolkit';
import blogReducer from './slices/blogSlice';

// Define AppDispatch type for dispatch typing in components
export type AppDispatch = typeof store.dispatch;

const store = configureStore({
    reducer: {
        blog: blogReducer,
    },
});

export default store;
