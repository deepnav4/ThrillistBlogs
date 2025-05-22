import React, { useEffect } from 'react'
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { useBlog } from '../hooks/index.js';
import { FullBlog } from '../components/FullBlog.jsx';
import AppBar from '../components/AppBar';
import { useTheme } from '../context/ThemeContext';
import Loading from '../pages/Loading';

const Blog = () => {
    const {id} = useParams();
    const {blog, loading} = useBlog(id);
    const { theme } = useTheme();
    const isAuthenticated = localStorage.getItem('token');
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);
    
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    
    if(loading) {
        return <div><Loading /></div>
    }
    
    if(!blog) {
        return (
            <div className={theme === 'dark' ? 'dark' : ''}>
                <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
                    <AppBar theme={theme} />
                    <div className="pt-20 text-center">
                        <p className="text-gray-500 dark:text-gray-400">Blog not found.</p>
                    </div>
                </div>
            </div>
        );
    }
    
    return (
        <div className={theme === 'dark' ? 'dark' : ''}>
            <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
                <AppBar theme={theme} />
                <div className="pt-20 ">
                    <FullBlog blog={blog} />
                </div>
            </div>
        </div>
    )
}

export default Blog

