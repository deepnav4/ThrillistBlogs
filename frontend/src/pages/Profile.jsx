import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '../components/AppBar';
import { FiMail, FiCalendar, FiFileText } from 'react-icons/fi';
import { Avatar } from '../components/BlogCard';
import { useTheme } from '../context/ThemeContext';
import { config } from '../config/config';
const BACKEND_URL = "http://localhost:3001/api/v1";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userBlogs, setUserBlogs] = useState([]);
  const { theme } = useTheme();

  const handleSignOut = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  useEffect(() => {
    // Check if user is authenticated using localStorage
    const userData = localStorage.getItem('token');
    if (!userData) {
      navigate('/login');
      return;
    }

    // Fetch user's profile and blogs
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${BACKEND_URL}/user/profile`, {
          headers: {
            'Authorization': `${token}`
          }
        });
        const data = await response.json();
        if (data.user) {
          setUser(data.user);
          setUserBlogs(data.user.blogs || []);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setUserBlogs([]);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <AppBar theme={theme} />
      <div className="min-h-screen pt-16 bg-gray-50 dark:bg-gray-900 font-['Inter',system-ui,-apple-system,sans-serif] transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">Profile</h1>
            <button
              onClick={handleSignOut}
              className="px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 border border-red-600 dark:border-red-400 hover:border-red-700 dark:hover:border-red-300 rounded-lg transition-colors"
            >
              Sign Out
            </button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 sticky top-20">
                <div className="flex flex-col items-center">
                  <div className="mb-4">
                    <Avatar name={user?.name || "Anonymous"} size="large" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">{user?.name || "Anonymous"}</h3>
                  
                  <div className="w-full space-y-4">
                    <div className="flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                      <FiMail className="w-5 h-5 mr-3" />
                      <span className="text-sm">{user?.email || "No email provided"}</span>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                      <FiCalendar className="w-5 h-5 mr-3" />
                      <span className="text-sm">Joined {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', {
                        month: 'long',
                        year: 'numeric'
                      }) : "Unknown date"}</span>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                      <FiFileText className="w-5 h-5 mr-3" />
                      <span className="text-sm">{userBlogs?.length || 0} blogs posted</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Blogs Section - Increased width */}
            <div className="lg:col-span-3 space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Your Blogs</h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                      You have published {userBlogs?.length || 0} blogs
                    </p>
                  </div>
                  <button
                    onClick={() => navigate('/publish')}
                    className="px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 border border-blue-600 dark:border-blue-400 hover:border-blue-700 dark:hover:border-blue-300 rounded-lg transition-colors"
                  >
                    New Blog
                  </button>
                </div>

                <div className="space-y-3">
                  {userBlogs?.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-500 dark:text-gray-400">No blogs published yet</p>
                      <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">Start writing your first blog!</p>
                    </div>
                  ) : (
                    Array.isArray(userBlogs) && userBlogs.map((blog) => (
                      <div 
                        key={blog._id} 
                        className="group border border-gray-200 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-800 rounded-lg p-4 cursor-pointer transition-all hover:shadow-md bg-white dark:bg-gray-800"
                        onClick={() => navigate(`/blog/${blog._id}`)}
                      >
                        <h4 className="font-semibold text-base mb-1 text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {blog.title}
                        </h4>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                          {new Date(blog.createdAt).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Blog Statistics */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Blog Statistics</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                      {userBlogs?.length || 0}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Total Blogs</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                      1.2K
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Total Views</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;


