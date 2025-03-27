import React, { useEffect } from 'react'
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { useBlog } from '../hooks/index.js';
import { FullBlog } from '../components/FullBlog.jsx';
import AppBar from '../components/AppBar';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const Blog = () => {
    const {id} = useParams();
    const {blog,loading} = useBlog(id);
    const { theme } = useTheme();
    const isAuthenticated = localStorage.getItem('token');
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/signin');
        }
    }, [isAuthenticated, navigate]);
    
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    
    if(loading){
        return <div>Loading...</div>
    }
    
    return (
        <div className={theme === 'dark' ? 'dark' : ''}>
            <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
                <AppBar theme={theme} />
                <div className="pt-20 bg-gradient-to-br from-gray-50 to-gray-50 
                              dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
                    <FullBlog blog={blog} />
                </div>
            </div>
        </div>
    )
}

export default Blog

