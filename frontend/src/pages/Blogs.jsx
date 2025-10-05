import React from 'react'
import {BlogCard} from '../components/BlogCard'
import { useBlogs } from '../hooks'
import { Navigate } from 'react-router-dom';
import AppBar from '../components/AppBar';
import { useTheme } from '../context/ThemeContext';
import Loading from '../pages/Loading';
import { config } from '../config/config';
const BACKEND_URL = "http://localhost:3001/api/v1";

const Blogs = () => {
    const {blogs, loading} = useBlogs();
    const { theme } = useTheme();
    const isAuthenticated = localStorage.getItem('token');

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if(loading) {
        return <div>
            <Loading />
        </div>
    }

    // Sort blogs by createdAt in descending order (latest first)
    const sortedBlogs = blogs ? [...blogs].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) : [];

    return (
        <div className={theme === 'dark' ? 'dark' : ''}>
            <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
                <AppBar theme={theme} />
                <div className="max-w-4xl mx-auto px-3 sm:px-4 pt-16 sm:pt-20 md:px-8 lg:px-0 py-4 sm:py-8">
                    {sortedBlogs.length > 0 ? (
                        sortedBlogs.map((blog) => (
                            <BlogCard
                                key={blog._id}
                                author={blog.author.name}
                                title={blog.title}
                                content={blog.content}
                                createdAt={blog.createdAt}
                                id={blog._id}
                                theme={theme}
                            />
                        ))
                    ) : (
                        <div className="text-center py-8">
                            <p className="text-gray-500 dark:text-gray-400">No blogs found.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Blogs
