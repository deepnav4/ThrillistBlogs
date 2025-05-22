import { motion } from "framer-motion"
import { FaCalendar, FaClock } from 'react-icons/fa';
import { Avatar } from './BlogCard';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';

const BACKEND_URL = "http://localhost:3001";

export const FullBlog = ({ blog }) => {  
  const navigate = useNavigate();
  const [otherBlogs, setOtherBlogs] = useState([]);

  useEffect(() => {
    if (blog?.author?._id) {
      fetchAuthorBlogs();
    }
  }, [blog]);

  const fetchAuthorBlogs = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/v1/blog/author/${blog.author._id}`,{
        headers: {
          Authorization: localStorage.getItem("token")
        }
      });
      // Filter out the current blog from the list
      const filteredBlogs = response.data.blogs.filter(authorBlog => authorBlog._id !== blog._id);
      setOtherBlogs(filteredBlogs);
    } catch (error) {
      console.error('Error fetching author blogs:', error);
    }
  };

  const isAuthor = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return false;
    }
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      // Check if we're comparing the correct fields
      return payload.userId === blog?.author?._id; // Changed from payload.id to payload.userId
    } catch (error) {
      console.error("Error checking author:", error);
      return false;
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;

    try {
      await axios.delete(`http://localhost:3001/api/v1/blog/${blog._id}`, {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      });
      navigate('/blogs'); // Redirect to blogs list after deletion
    } catch (error) {
      console.error('Error deleting blog:', error);
      alert('Failed to delete blog. Please try again.');
    }
  };

  const calculateReadTime = (content) => {
    const wordsPerMinute = 200;
    const words = content?.split(/\s+/)?.length || 0;
    const minutes = Math.ceil(words / wordsPerMinute);
    return minutes;
  };

  const formatContent = (content) => {
    if (!content) return '';
    
    try {
      let formattedContent = content
        // Format headings with more modest sizing
        .replace(/#(.*?)#/g, '<h1 class="text-xl sm:text-2xl font-bold font-inter text-gray-900 dark:text-gray-100 py-2 sm:py-3 my-2 border-b border-gray-200 dark:border-gray-700">$1</h1>')
        
        // Simplified bold and italic styling
        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold font-inter text-gray-900 dark:text-gray-100">$1</strong>')
        .replace(/\*(.*?)\*/g, '<em class="italic font-inter text-gray-800 dark:text-gray-200">$1</em>')
        
        // Simplified link styling
        .replace(/\$(.*?)\$/g, '<a href="$1" class="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-inter underline transition-colors duration-300" target="_blank" rel="noopener noreferrer">$1</a>')
        
        // Simplified code block styling
        .replace(/```(\w+)?\n([\s\S]*?)```/g, (match, language, code) => `
          <div class="my-2 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
            ${language ? 
              `<div class="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs font-medium border-b border-gray-200 dark:border-gray-700">${language}</div>` 
              : ''
            }
            <pre class="p-2 sm:p-3 overflow-x-auto bg-gray-50 dark:bg-gray-900"><code class="text-gray-800 dark:text-gray-200 font-mono text-xs whitespace-pre">${code}</code></pre>
          </div>
        `.trim())
        
        // Simplified inline code styling
        .replace(/`([^`]+)`/g, '<code class="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-1.5 py-0.5 rounded text-sm font-mono">$1</code>')
        
        .replace(/\n/g, '<br>');

      return formattedContent;
    } catch (error) {
      console.error("Error formatting content:", error);
      return content;
    }
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  const readTime = calculateReadTime(blog?.content);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 dark:bg-gray-900 font-['Inter',system-ui,-apple-system,sans-serif]"
    >
      <motion.div 
        className="grid grid-cols-12 px-2 sm:px-4 md:px-16 lg:px-24 py-4 sm:py-8 max-w-7xl mx-auto gap-4 sm:gap-6"
      >
        <motion.div 
          className="col-span-12 md:col-span-8 bg-white dark:bg-gray-800 rounded-xl shadow-sm 
                    border border-gray-100 dark:border-gray-700 p-4 sm:p-6"
        >
          <motion.div 
            className="prose max-w-none dark:prose-invert"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 sm:gap-4 mb-4">
              <Avatar name={blog?.author?.name || "Anonymous"} />
              <div>
                <h3 className="font-semibold font-inter text-gray-900 dark:text-gray-100 text-sm">
                  {blog?.author?.name || "Anonymous"}
                </h3>
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 font-inter">
                  <span className="flex items-center gap-1">
                    <FaCalendar className="text-gray-400 dark:text-gray-500" size={8} />
                    {new Date(blog?.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                  <span className="inline-block w-1 h-1 rounded-full bg-gray-500 dark:bg-gray-400" />
                  <span className="flex items-center gap-1">
                    <FaClock className="text-gray-400 dark:text-gray-500" size={8} />
                    {calculateReadTime(blog?.content)} min read
                  </span>
                </div>
              </div>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              {blog?.title}
            </h1>
            <motion.div 
              className="text-gray-700 dark:text-gray-200 leading-relaxed space-y-2 sm:space-y-3
                         text-sm sm:text-base font-inter"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              dangerouslySetInnerHTML={{ __html: formatContent(blog?.content) }}
            />
          </motion.div>
        </motion.div>

        <motion.div 
          className="col-span-12 md:col-span-4"
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm 
                      border border-gray-100 dark:border-gray-700 p-4 sm:p-6 h-fit md:sticky md:top-4"
            whileHover={{ boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col gap-3 sm:gap-4">
              <div className="flex items-center gap-2 sm:gap-4">
                <Avatar name={blog?.author?.name || "Anonymous"} />
                <div>
                  <motion.div 
                    className="text-base sm:text-lg md:text-base font-bold font-inter text-gray-900 dark:text-gray-100"
                    whileHover={{ color: "#3B82F6" }}
                    transition={{ duration: 0.3 }}
                  >
                    {blog?.author?.name || "Anonymous"}
                  </motion.div>
                  <motion.div 
                    className="text-xs sm:text-sm font-inter text-gray-500 dark:text-gray-400"
                    whileHover={{ color: "#374151" }}
                    transition={{ duration: 0.3 }}
                  >
                    {blog?.author?.email || "anonymous@email.com"}
                  </motion.div>
                </div>
              </div>

              {isAuthor() && (
                <div className="space-y-2">
                  <motion.button
                    onClick={() => navigate(`/blog/${blog._id}/edit`)}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg 
                              hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600
                              transition-all duration-300 text-sm font-medium font-inter 
                              flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                    Edit Blog
                  </motion.button>
                  
                  <motion.button
                    onClick={handleDelete}
                    className="w-full px-4 py-2 bg-red-600 text-white rounded-lg 
                              hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600
                              transition-all duration-300 text-sm font-medium font-inter 
                              flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    Delete Blog
                  </motion.button>
                </div>
              )}
            </div>
            
            {otherBlogs.length > 0 && (
              <div className="mt-6 sm:mt-8">
                <h3 className="text-base sm:text-lg font-semibold font-inter text-gray-900 dark:text-gray-100 mb-3 sm:mb-4">
                  More from {blog?.author?.name}
                </h3>
                <div className="space-y-3 sm:space-y-4">
                  {otherBlogs.map((otherBlog) => (
                    <motion.div
                      key={otherBlog._id}
                      className="group cursor-pointer"
                      onClick={() => navigate(`/blog/${otherBlog._id}`)}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 
                                    hover:bg-gray-100 dark:hover:bg-gray-700 
                                    transition-all duration-300">
                        <h4 className="text-md font-medium font-inter text-gray-900 dark:text-gray-100 
                                     group-hover:text-purple-600 dark:group-hover:text-purple-400 
                                     transition-all duration-300">
                          {otherBlog.title}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 font-inter">
                          {new Date(otherBlog.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}