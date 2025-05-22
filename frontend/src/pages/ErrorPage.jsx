import React from 'react';
import { motion } from 'framer-motion';
import AppBar from '../components/AppBar';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';

const ErrorPage = ({ message = "Something went wrong" }) => {
  const { theme } = useTheme();

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <AppBar theme={theme} />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 pt-20 pb-8 flex flex-col items-center justify-center">
        <div className="w-full max-w-md mx-auto p-8">
          <motion.div
            className="bg-white/20 dark:bg-gray-800/20 rounded-xl p-8 border border-gray-100/30 dark:border-gray-700/30 shadow-lg backdrop-blur-sm text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="w-16 h-16 mx-auto mb-4 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center text-red-600 dark:text-red-400"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </motion.div>
            
            <motion.h1 
              className="text-2xl font-medium text-gray-900 dark:text-gray-100 mb-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Error Encountered
            </motion.h1>
            
            <motion.p
              className="text-gray-600 dark:text-gray-400 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {message}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Link 
                to="/"
                className="inline-block px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Return Home
              </Link>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="mt-8 text-center text-gray-600 dark:text-gray-400 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <p>If this problem persists, please contact support.</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage; 