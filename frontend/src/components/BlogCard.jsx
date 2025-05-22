import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

function Avatar({ name }) {
    // Generate a random avatar URL using DiceBear's cute avatars
    const avatarUrl = `https://api.dicebear.com/7.x/micah/svg?seed=${name}`;
    
    return (
        <div className="relative">
            <img 
                src={avatarUrl} 
                alt={name} 
                className="w-12 h-12 rounded-full ring-2 ring-white/50 shadow-lg"
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white shadow-md" />
        </div>
    );
}

function BlogCard({ author, title, content, createdAt, id }) {
    const [isHovered, setIsHovered] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const { theme } = useTheme();
    
    const truncatedContent = content.length > 150 
        ? content.substr(0, 250) + '...' 
        : content;

    const handleShare = (e) => {
        e.preventDefault(); // Prevent navigation
        const blogUrl = `${window.location.origin}/blog/${id}`;
        navigator.clipboard.writeText(blogUrl);
        
        // Add visual feedback for copy
        const shareButton = e.currentTarget;
        shareButton.classList.add('text-green-500');
        setTimeout(() => {
            shareButton.classList.remove('text-green-500');
        }, 1000);
    };

    const handleLike = (e) => {
        e.preventDefault(); // Prevent navigation
        setIsLiked(!isLiked);
    };

    return (
        <motion.article 
            className="group relative overflow-hidden rounded-xl p-4 sm:p-6 mb-4 sm:mb-6
                       bg-white dark:bg-gray-800 
                       border border-gray-100 dark:border-gray-700
                       hover:shadow-lg dark:hover:shadow-gray-800/50
                       transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
        >
            <div className="relative">
                {/* Author Section */}
                <div className="flex items-center mb-4 sm:mb-6 space-x-3 sm:space-x-4">
                    <Avatar name={author} />
                    <div>
                        <h3 className="font-semibold text-sm sm:text-base text-gray-900 dark:text-gray-100">
                            {author}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                            <span className="inline-block w-1 h-1 rounded-full bg-gray-400 dark:bg-gray-500" />
                            {new Date(createdAt).toLocaleDateString('en-US', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric'
                            })}
                        </p>
                    </div>
                </div>

                {/* Title */}
                <Link to={`/blog/${id}`}>
                    <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-900 dark:text-gray-100
                                 hover:text-blue-600 dark:hover:text-blue-400
                                 transition-colors duration-300">
                        {title}
                    </h2>
                </Link>

                {/* Content */}
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4 sm:mb-6 
                             text-xs sm:text-sm line-clamp-3">
                    {truncatedContent}
                </p>

                {/* Actions */}
                <div className="flex items-center justify-between pt-3 sm:pt-4 
                              border-t border-gray-100 dark:border-gray-700">
                    <Link 
                        to={`/blog/${id}`}
                        className="inline-flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 
                                 text-xs sm:text-sm font-medium text-blue-600 dark:text-blue-400 
                                 hover:text-blue-700 dark:hover:text-blue-300
                                 transition-colors duration-300"
                    >
                        Read More
                        <svg 
                            className="w-3 h-3 sm:w-4 sm:h-4 transform group-hover:translate-x-1 transition-transform" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                    
                    <div className="flex items-center gap-2 sm:gap-4">
                        <motion.button 
                            onClick={handleLike}
                            className={`p-2 sm:p-2.5 rounded-full transition-colors duration-300
                                      ${isLiked 
                                        ? 'text-red-500 bg-red-50 dark:bg-red-900/30' 
                                        : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'}`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <motion.svg 
                                className="w-4 h-4 sm:w-5 sm:h-5" 
                                fill={isLiked ? "currentColor" : "none"} 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={2} 
                                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                                />
                            </motion.svg>
                        </motion.button>
                        <motion.button 
                            onClick={handleShare}
                            className="p-2 sm:p-2.5 rounded-full text-gray-400 dark:text-gray-500 
                                     hover:text-gray-600 dark:hover:text-gray-300 
                                     transition-colors duration-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <motion.svg 
                                className="w-4 h-4 sm:w-5 sm:h-5" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                            </motion.svg>
                        </motion.button>
                    </div>
                </div>
            </div>
        </motion.article>
    );
}

export { BlogCard, Avatar }