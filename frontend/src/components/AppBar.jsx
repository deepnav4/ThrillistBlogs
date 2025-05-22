import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { FaPen, FaUser, FaBars, FaTimes } from 'react-icons/fa';

const AppBar = ({ theme = 'dark' }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { title: 'Home', path: '/' },
    { title: 'Blogs', path: '/blogs' },
    { title: 'About', path: '/about' },
    { title: 'Contact', path: 'https://deepnav4.github.io/Portfolio/' },
  ];

  const themeStyles = {
    dark: {
      nav: 'bg-transparent',
      text: 'text-gray-200',
      hover: 'hover:text-purple-400',
      active: 'text-purple-400',
      mobileMenu: 'bg-gray-900',
      button: 'hover:bg-gray-800',
      container: isScrolled 
        ? 'bg-gray-900 border border-gray-800/50 shadow-[0_8px_32px_rgba(0,0,0,0.5)]' 
        : 'bg-gray-900 border border-gray-800/30 shadow-lg',
      logo: {
        gradient: ['#9333EA', '#7C3AED'],
        innerPath: '#1A1A1A',
        text: 'from-purple-400 via-purple-300 to-violet-300',
        subtext: 'text-gray-400'
      }
    },
    light: {
      nav: 'bg-transparent',
      text: 'text-gray-800',
      hover: 'hover:text-purple-700',
      active: 'text-purple-700',
      mobileMenu: 'bg-white',
      button: 'hover:bg-gray-50',
      container: isScrolled 
        ? 'bg-white border border-gray-200 shadow-lg' 
        : 'bg-white border border-gray-100 shadow-md',
      logo: {
        gradient: ['#9333EA', '#7C3AED'],
        innerPath: '#FFFFFF',
        text: 'from-gray-900 via-purple-900 to-gray-900',
        subtext: 'text-gray-600'
      }
    }
  };

  const styles = themeStyles[theme];

  return (
    <motion.nav
      className={`fixed w-full z-[100] transition-all duration-300 px-4 py-3 ${styles.nav}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div 
        className={`
          max-w-7xl mx-auto rounded-full relative overflow-hidden
          ${styles.container} 
          transition-all duration-500 ease-in-out
          hover:shadow-xl dark:hover:shadow-black/30
          hover:border-gray-300 dark:hover:border-gray-700
          backdrop-blur-md
        `}
      >
        <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md -z-10"></div>

        <div className="flex items-center justify-between h-14 px-6 relative z-10">
          {/* Updated Logo with Premium Cursive Font */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <motion.path
                  d="M20 2L38 20L20 38L2 20L20 2Z"
                  fill={`url(#gradient-${theme})`}
                  className="transform origin-center transition-transform duration-300 group-hover:scale-110"
                />
                <motion.path
                  d="M20 10L30 20L20 30L10 20L20 10Z"
                  fill={theme === 'light' ? styles.logo.innerPath : 'white'}
                  className="transform origin-center transition-transform duration-300 group-hover:scale-95"
                />
                <defs>
                  <linearGradient id={`gradient-${theme}`} x1="2" y1="2" x2="38" y2="38" gradientUnits="userSpaceOnUse">
                    <stop stopColor={theme === 'light' ? styles.logo.gradient[0] : '#818CF8'} />
                    <stop offset="1" stopColor={theme === 'light' ? styles.logo.gradient[1] : '#6366F1'} />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute -top-1 -left-1 right-1 bottom-1 bg-indigo-500/20 blur-xl rounded-full"></div>
            </div>
            <div className="flex flex-col">
              <span 
                className={`text-xl font-sans bg-gradient-to-r ${theme === 'light' ? styles.logo.text : 'from-indigo-400 via-purple-400 to-blue-400'} bg-clip-text text-transparent transform transition-transform duration-300 group-hover:scale-105`}
                style={{ 
                  letterSpacing: '0.02em',
                  textShadow: '0 0 1px rgba(255,255,255,0.1)'
                }}
              >
                Thrillist
              </span>
              <span className={`text-[8px] tracking-[0.2em] ${theme === 'light' ? styles.logo.subtext : 'text-slate-400'} font-light uppercase -mt-1 ml-1`}>
                Stories that matter
              </span>
            </div>
          </Link>

          {/* Desktop Navigation - Updated */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link 
                key={item.path} 
                to={item.path} 
                className={`
                  text-sm font-medium ${styles.text} ${styles.hover} 
                  transition-all duration-300
                  relative after:absolute after:bottom-0 after:left-0 after:w-0 
                  after:h-0.5 after:bg-purple-600 dark:after:bg-purple-400 after:transition-all 
                  after:duration-300 hover:after:w-full
                `}
              >
                {item.title}
              </Link>
            ))}
          </div>

          {/* Action Buttons - Updated */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              to="/publish" 
              className={`
                text-sm font-medium px-4 py-2 rounded-full
                border border-gray-200 dark:border-gray-800 ${styles.text} 
                transition-all duration-300
                hover:bg-gray-50 dark:hover:bg-gray-800
                hover:border-gray-300 dark:hover:border-gray-700
                hover:shadow-md dark:hover:shadow-black/30
              `}
            >
              Write Story
            </Link>
            <button 
              onClick={() => {
                const newTheme = theme === 'light' ? 'dark' : 'light';
                localStorage.setItem('theme', newTheme);
                window.dispatchEvent(new Event('themeChange'));
              }}
              className={`
                text-sm font-medium px-4 py-2 rounded-full
                border ${theme === 'light' ? 'border-gray-200' : 'border-gray-800'} 
                ${styles.text} transition-all duration-300
                hover:bg-gray-50 dark:hover:bg-gray-800
                hover:border-gray-300 dark:hover:border-gray-700
              `}
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
            <Link
              to="/profile"
              className="
                flex items-center space-x-2 
                bg-gradient-to-r from-purple-600 to-violet-600 
                dark:from-purple-500 dark:to-violet-500
                text-white px-6 py-2 rounded-full 
                text-sm font-medium 
                transition-all duration-300
                hover:shadow-[0_4px_20px_rgba(147,51,234,0.3)]
                dark:hover:shadow-[0_4px_20px_rgba(147,51,234,0.2)]
                hover:from-purple-500 hover:to-violet-500
                dark:hover:from-purple-400 dark:hover:to-violet-400
                active:scale-95
              "
            >
              <span>Profile</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <button 
                onClick={() => {
                  const newTheme = theme === 'light' ? 'dark' : 'light';
                  localStorage.setItem('theme', newTheme);
                  window.dispatchEvent(new Event('themeChange'));
                }}
                className={`
                  text-sm font-medium px-4 py-2 rounded-full
                  border ${theme === 'light' ? 'border-gray-200' : 'border-gray-800'} 
                  ${styles.text} transition-all duration-300
                  hover:bg-gray-50 dark:hover:bg-gray-800
                  hover:border-gray-300 dark:hover:border-gray-700
                `}
              >
                {theme === 'light' ? '🌙' : '☀️'}
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`p-2 rounded-full ${styles.text} ${styles.hover}`}
              >
                {isMobileMenuOpen ? (
                  <FaTimes className="w-5 h-5" />
                ) : (
                  <FaBars className="w-5 h-5" />
                )}
              </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Updated with higher z-index and proper backdrop */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`
              md:hidden mt-3 rounded-2xl mx-4 
              ${theme === 'dark' 
                ? 'bg-gray-900/95 border-gray-800' 
                : 'bg-white/95 border-gray-200'} 
              border shadow-lg backdrop-blur-md z-[90]
            `}
          >
            <div className="px-4 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    block px-4 py-2.5 rounded-lg text-sm font-medium 
                    ${theme === 'dark' 
                      ? 'text-gray-300 hover:text-purple-400 hover:bg-gray-800' 
                      : 'text-gray-700 hover:text-purple-600 hover:bg-gray-50'}
                    transition-all duration-300
                  `}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.title}
                </Link>
              ))}
              <Link
                to="/publish"
                className="
                  block px-4 py-2.5 mt-2 rounded-lg text-sm font-medium 
                  text-white bg-gradient-to-r from-purple-600 to-violet-600
                  dark:from-purple-500 dark:to-violet-500
                  hover:from-purple-500 hover:to-violet-500
                  dark:hover:from-purple-400 dark:hover:to-violet-400
                  transition-all duration-300
                  hover:shadow-[0_4px_20px_rgba(147,51,234,0.3)]
                  dark:hover:shadow-[0_4px_20px_rgba(147,51,234,0.2)]
                "
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Write Story
              </Link>
              <Link
                to="/profile"
                className="
                  block px-4 py-2.5 mt-2 rounded-lg text-sm font-medium 
                  text-white bg-gradient-to-r from-purple-600 to-violet-600
                  dark:from-purple-500 dark:to-violet-500
                  hover:from-purple-500 hover:to-violet-500
                  dark:hover:from-purple-400 dark:hover:to-violet-400
                  transition-all duration-300
                  hover:shadow-[0_4px_20px_rgba(147,51,234,0.3)]
                  dark:hover:shadow-[0_4px_20px_rgba(147,51,234,0.2)]
                "
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Profile
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default AppBar;
