import React from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import AppBar from '../components/AppBar'

const About = () => {
    const { theme } = useTheme();

    const pageVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { 
            opacity: 1, 
            y: 0,
            transition: {
                duration: 0.6,
                staggerChildren: 0.2
            }
        }
    }

    const itemVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 }
    }

    return (
        <div className={theme === 'dark' ? 'dark' : ''}>
            <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
                <AppBar theme={theme} />
                <div className="pt-16 sm:pt-20 bg-gradient-to-br from-gray-50 to-gray-50 
                              dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
                    <motion.div
                        variants={pageVariants}
                        initial="initial"
                        animate="animate"
                        className="container mx-auto px-3 sm:px-6 lg:px-8 py-2 sm:py-4"
                    >
                        <div className="max-w-7xl mx-auto rounded-lg sm:rounded-xl shadow-lg sm:shadow-2xl 
                                      p-4 sm:p-8 bg-white dark:bg-gray-800 
                                      text-gray-900 dark:text-gray-100 
                                      shadow-gray-200/50 dark:shadow-gray-900/50">
                            {/* Header Section */}
                            {/* <motion.div 
                                variants={itemVariants}
                                className="text-center mb-16"
                            >
                                <h1 className="text-4xl font-bold sm:text-5xl mb-4 text-gray-900 dark:text-white">
                                    About Me
                                </h1>
                                <div className="w-24 h-1 mx-auto rounded-full bg-blue-600 dark:bg-blue-500"></div>
                            </motion.div> */}

                            {/* Main Content */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-12 items-stretch">
                                {/* Personal Info Section */}
                                <motion.div 
                                    variants={itemVariants}
                                    className="space-y-4 sm:space-y-8 h-full"
                                >
                                    {/* Personal Details Card */}
                                    <div className="p-4 sm:p-8 rounded-lg sm:rounded-xl h-full transition-colors 
                                                  bg-white dark:bg-gray-800/50 
                                                  shadow-md sm:shadow-lg hover:shadow-xl dark:shadow-gray-900/50">
                                        <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white">
                                            About Me
                                        </h3>
                                        <div className="space-y-3 sm:space-y-4">
                                            <div>
                                                <h4 className="text-base sm:text-lg font-semibold text-blue-600 dark:text-blue-400">
                                                    Navdeep Singh
                                                </h4>
                                                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                                                    Full Stack Developer
                                                </p>
                                            </div>
                                            <div>
                                                <h4 className="text-base sm:text-lg font-semibold text-blue-600 dark:text-blue-400">
                                                    Skills
                                                </h4>
                                                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                                                    JavaScript, React, Node.js, MongoDB, AWS
                                                </p>
                                            </div>
                                            <div>
                                                <h4 className="text-base sm:text-lg font-semibold text-blue-600 dark:text-blue-400">
                                                    Education
                                                </h4>
                                                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                                                    Bachelor's in Computer Science
                                                </p>
                                            </div>
                                            <div>
                                                <h4 className="text-base sm:text-lg font-semibold text-blue-600 dark:text-blue-400">
                                                    Location
                                                </h4>
                                                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                                                    Jalandhar, Punjab, India
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Additional Info Card */}
                                    {/* <div className="p-8 rounded-xl transition-colors bg-gray-50 dark:bg-gray-700/50">
                                        <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                                            Professional Summary
                                        </h3>
                                        <div className="space-y-4">
                                            <div>
                                                <h4 className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                                                    Education
                                                </h4>
                                                <p className="text-gray-600 dark:text-gray-300">
                                                    Bachelor's in Computer Science
                                                </p>
                                            </div>
                                            <div>
                                                <h4 className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                                                    Interests
                                                </h4>
                                                <p className="text-gray-600 dark:text-gray-300">
                                                    Web Development, Cloud Computing, AI/ML
                                                </p>
                                            </div>
                                            <div>
                                                <h4 className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                                                    Languages
                                                </h4>
                                                <p className="text-gray-600 dark:text-gray-300">
                                                    English, Hindi, Punjabi
                                                </p>
                                            </div>
                                        </div>
                                    </div> */}
                                </motion.div>

                                {/* Projects & Experience Section */}
                                <motion.div 
                                    variants={itemVariants}
                                    className="space-y-4 sm:space-y-8 h-full"
                                >
                                    <div className="p-4 sm:p-8 rounded-lg sm:rounded-xl h-full transition-colors 
                                                  bg-white dark:bg-gray-800/50 
                                                  shadow-md sm:shadow-lg hover:shadow-xl dark:shadow-gray-900/50">
                                        <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-900 dark:text-white">
                                            About This Blog Platform
                                        </h3>
                                        <div className="space-y-4 sm:space-y-6">
                                            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
                                                This modern blogging platform is built with cutting-edge technologies and features:
                                            </p>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                                                <div className="space-y-3 sm:space-y-4">
                                                    <h4 className="text-lg sm:text-xl font-semibold text-blue-600 dark:text-blue-400">
                                                        Core Features
                                                    </h4>
                                                    <ul className="space-y-2 text-sm sm:text-base text-gray-600 dark:text-gray-300">
                                                        <li className="flex items-center">
                                                            <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                                            </svg>
                                                            User Authentication & Authorization
                                                        </li>
                                                        <li className="flex items-center">
                                                            <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                                            </svg>
                                                            Rich Text Editor with Markdown Support
                                                        </li>
                                                        <li className="flex items-center">
                                                            <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                                            </svg>
                                                            Dynamic Dark/Light Theme
                                                        </li>
                                                        <li className="flex items-center">
                                                            <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                                            </svg>
                                                            Responsive Design
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="space-y-3 sm:space-y-4">
                                                    <h4 className="text-lg sm:text-xl font-semibold text-blue-600 dark:text-blue-400">
                                                        Technical Stack
                                                    </h4>
                                                    <ul className="space-y-2 text-sm sm:text-base text-gray-600 dark:text-gray-300">
                                                        <li className="flex items-center">
                                                            <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                                            </svg>
                                                            React with Hooks & Context
                                                        </li>
                                                        <li className="flex items-center">
                                                            <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                                            </svg>
                                                            Node.js & Express Backend
                                                        </li>
                                                        <li className="flex items-center">
                                                            <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                                            </svg>
                                                            MongoDB Database
                                                        </li>
                                                        <li className="flex items-center">
                                                            <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                                            </svg>
                                                            TailwindCSS & Framer Motion
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default About
