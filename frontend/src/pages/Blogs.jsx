import React from 'react'
import {BlogCard} from '../components/BlogCard'
import { useBlogs } from '../hooks'
import { Navigate } from 'react-router-dom';
import AppBar from '../components/AppBar';
import { useTheme } from '../context/ThemeContext';
import Loading from '../components/Loading';
import { config } from '../config/config';
const BACKEND_URL = config.BACKEND_URL;

const Blogs = () => {
    const {blogs, loading} = useBlogs();
    const { theme } = useTheme();
    const isAuthenticated = localStorage.getItem('token');

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if(loading) {
        return <div><Loading /></div>
    }

    return (
        <div className={theme === 'dark' ? 'dark' : ''}>
            <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
                <AppBar theme={theme} />
                <div className="max-w-4xl mx-auto px-3 sm:px-4 pt-16 sm:pt-20 md:px-8 lg:px-0 py-4 sm:py-8
                              bg-gradient-to-br from-white via-purple-50/10 to-violet-50/10
                              dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
                    {[...blogs]
                        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                        .map((blog) => (
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
                    }
                </div>
            </div>
        </div>
    )
}

export default Blogs
