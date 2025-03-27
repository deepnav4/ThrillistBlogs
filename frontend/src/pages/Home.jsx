import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaPen, FaBook, FaSignInAlt, FaLightbulb, FaUsers, FaTrophy, FaNewspaper } from 'react-icons/fa';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import AppBar from '../components/AppBar';
import hero from "../assets/heroImages/hero.jpg"
import { useTheme } from '../context/ThemeContext';

const ScrollingLogos = () => (
  <div className="w-full overflow-hidden bg-white/5 dark:bg-slate-800/5  py-8">
    {/* <div className="text-center mb-4">
      <span className="text-slate-400">Used by 5,000+ businesses & freelancers in 129+ countries</span>
    </div> */}
    <div className="relative">
      <div className="flex animate-scroll-left space-x-16 whitespace-nowrap">
        {/* First set of writers */}
        <div className="flex items-center space-x-16">
          <span className="text-slate-500 dark:text-slate-400">Writer from India 🇮🇳</span>
          <span className="text-slate-500 dark:text-slate-400">Poet from UK 🇬🇧</span>
          <span className="text-slate-500 dark:text-slate-400">Novelist from US 🇺🇸</span>
          <span className="text-slate-500 dark:text-slate-400">Creator from Japan 🇯🇵</span>
          <span className="text-slate-500 dark:text-slate-400">Author from France 🇫🇷</span>
          <span className="text-slate-500 dark:text-slate-400">Storyteller from Canada 🇨🇦</span>
          <span className="text-slate-500 dark:text-slate-400">Writer from Australia 🇦🇺</span>
        </div>
        {/* Duplicate set for seamless scrolling */}
        <div className="flex items-center space-x-16">
          <span className="text-slate-500 dark:text-slate-400">Writer from India 🇮🇳</span>
          <span className="text-slate-500 dark:text-slate-400">Poet from UK 🇬🇧</span>
          <span className="text-slate-500 dark:text-slate-400">Novelist from US 🇺🇸</span>
          <span className="text-slate-500 dark:text-slate-400">Creator from Japan 🇯🇵</span>
          <span className="text-slate-500 dark:text-slate-400">Author from France 🇫🇷</span>
          <span className="text-slate-500 dark:text-slate-400">Storyteller from Canada 🇨🇦</span>
          <span className="text-slate-500 dark:text-slate-400">Writer from Australia 🇦🇺</span>
        </div>
      </div>
    </div>
  </div>
);

const Home = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  
  // Transform values for SVG animations
  const yRange = useTransform(scrollY, [0, 500], [0, 200]);
  const scaleRange = useTransform(scrollY, [0, 500], [1, 1.5]);
  const opacityRange = useTransform(scrollY, [0, 500], [1, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  const floatVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const heroImageVariants = {
    hidden: { scale: 1.2, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: "easeOut"
      }
    }
  };

  const fadeInUpVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const glowVariants = {
    animate: {
      boxShadow: [
        "0 0 20px rgba(147, 51, 234, 0.15)",
        "0 0 60px rgba(147, 51, 234, 0.25)",
        "0 0 20px rgba(147, 51, 234, 0.15)"
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <motion.div
        ref={containerRef}
        className="min-h-screen bg-gradient-to-br from-white via-purple-50/30 to-violet-50/20 
                   dark:from-black dark:via-gray-900 dark:to-gray-950
                   font-['Inter',system-ui,-apple-system,sans-serif] transition-colors duration-500"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Decorative SVGs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Circle SVG */}
          <motion.div
            className="absolute top-20 left-[10%]"
            style={{ y: yRange, scale: scaleRange, opacity: opacityRange }}
          >
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
              <circle cx="30" cy="30" r="30" className="fill-slate-200/10 dark:fill-slate-400/10"/>
              <circle cx="30" cy="30" r="20" className="fill-slate-200/20 dark:fill-slate-400/20"/>
            </svg>
          </motion.div>

          {/* Diamond SVG */}
          <motion.div
            className="absolute top-40 right-[15%]"
            style={{ y: yRange, scale: scaleRange, opacity: opacityRange }}
          >
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
              <path d="M40 0L80 40L40 80L0 40L40 0Z" fill="rgba(100, 116, 139, 0.1)"/>
              <path d="M40 20L60 40L40 60L20 40L40 20Z" fill="rgba(100, 116, 139, 0.2)"/>
            </svg>
          </motion.div>

          {/* Wave SVG */}
          <motion.div
            className="absolute bottom-40 left-[20%]"
            style={{ y: yRange, scale: scaleRange, opacity: opacityRange }}
          >
            <svg width="120" height="40" viewBox="0 0 120 40" fill="none">
              <path 
                d="M0 20C20 20 20 40 40 40C60 40 60 0 80 0C100 0 100 20 120 20"
                stroke="rgba(100, 116, 139, 0.2)"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </motion.div>

          {/* Plus SVG */}
          <motion.div
            className="absolute top-60 left-[80%]"
            style={{ y: yRange, scale: scaleRange, opacity: opacityRange }}
          >
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <path d="M20 0V40M0 20H40" stroke="rgba(100, 116, 139, 0.2)" strokeWidth="4"/>
            </svg>
          </motion.div>

          {/* Dots Pattern */}
          <motion.div
            className="absolute top-80 right-[25%]"
            style={{ y: yRange, scale: scaleRange, opacity: opacityRange }}
          >
            <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
              {[0, 1, 2, 3].map((row) => (
                [0, 1, 2, 3].map((col) => (
                  <circle
                    key={`${row}-${col}`}
                    cx={20 + col * 20}
                    cy={20 + row * 20}
                    r="2"
                    fill="rgba(100, 116, 139, 0.2)"
                  />
                ))
              ))}
            </svg>
          </motion.div>

          {/* Hexagon SVG */}
          <motion.div
            className="absolute top-32 left-[35%]"
            style={{ 
              y: useTransform(scrollY, [0, 500], [0, -300]),
              scale: scaleRange,
              opacity: opacityRange 
            }}
          >
            <svg width="70" height="80" viewBox="0 0 70 80" fill="none">
              <path d="M35 0L70 20V60L35 80L0 60V20L35 0Z" fill="rgba(100, 116, 139, 0.15)"/>
              <path d="M35 20L52.5 30V50L35 60L17.5 50V30L35 20Z" fill="rgba(100, 116, 139, 0.25)"/>
            </svg>
          </motion.div>

          {/* Spiral SVG */}
          <motion.div
            className="absolute bottom-60 right-[40%]"
            style={{ 
              y: useTransform(scrollY, [0, 500], [0, 400]),
              rotate: useTransform(scrollY, [0, 500], [0, 180]),
              opacity: opacityRange 
            }}
          >
            <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
              <path
                d="M50 50 C60 40, 40 20, 50 10 C60 0, 80 20, 90 50 C100 80, 80 100, 50 90"
                stroke="rgba(100, 116, 139, 0.2)"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </motion.div>

          {/* Triangle Pattern */}
          <motion.div
            className="absolute top-96 left-[60%]"
            style={{ 
              x: useTransform(scrollY, [0, 500], [0, 200]),
              y: useTransform(scrollY, [0, 500], [0, -100]),
              opacity: opacityRange 
            }}
          >
            <svg width="90" height="90" viewBox="0 0 90 90" fill="none">
              <path d="M45 0L90 90H0L45 0Z" fill="rgba(100, 116, 139, 0.1)"/>
              <path d="M45 30L67.5 75H22.5L45 30Z" fill="rgba(100, 116, 139, 0.2)"/>
            </svg>
          </motion.div>

          {/* Squares Grid */}
          <motion.div
            className="absolute bottom-80 left-[5%]"
            style={{ 
              x: useTransform(scrollY, [0, 500], [0, -200]),
              rotate: useTransform(scrollY, [0, 500], [0, 45]),
              opacity: opacityRange 
            }}
          >
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
              {[0, 1, 2].map((row) => (
                [0, 1, 2].map((col) => (
                  <rect
                    key={`${row}-${col}`}
                    x={10 + col * 40}
                    y={10 + row * 40}
                    width="20"
                    height="20"
                    fill="rgba(100, 116, 139, 0.15)"
                  />
                ))
              ))}
            </svg>
          </motion.div>
        </div>
        
        {/* Navbar with adjusted z-index */}
        <div className="relative z-50">
          <AppBar theme={theme} />
        </div>
        
        {/* Hero Section - reduced padding */}
        <div className="relative min-h-[80vh] flex items-center justify-center px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              className="text-4xl mt-16 sm:text-6xl md:text-7xl font-bold text-slate-800 dark:text-slate-100 mb-4"
              variants={fadeInUpVariants}
            >
              Get thrilled
              <br />
              <span className="bg-gradient-to-r from-purple-600 via-purple-400 to-violet-400 
                             dark:from-purple-400 dark:via-purple-300 dark:to-violet-300 
                             bg-clip-text text-transparent">
                same day
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-lg sm:text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-6"
              variants={fadeInUpVariants}
            >
              By reading the most exciting stories on the planet.
            </motion.p>

            <motion.button
              variants={glowVariants}
              animate="animate"
              className="bg-gradient-to-r from-purple-600 via-purple-500 to-violet-500 
                         dark:from-purple-500 dark:via-purple-400 dark:to-violet-400
                         text-white px-12 py-4 rounded-full text-xl font-semibold 
                         hover:from-purple-700 hover:via-purple-600 hover:to-violet-600
                         dark:hover:from-purple-600 dark:hover:via-purple-500 dark:hover:to-violet-500
                         transition-all duration-300 shadow-lg hover:shadow-xl
                         dark:shadow-purple-500/20"
              onClick={() => navigate('/blogs')}
            >
              Get Started
            </motion.button>

            <motion.p 
              className="mt-8 text-slate-500 dark:text-slate-400"
              variants={fadeInUpVariants}
            >
              Used by 5,000+ writers & readers in 129+ countries
            </motion.p>
          </div>
        </div>

        {/* Add ScrollingLogos component here */}
        <ScrollingLogos />

        {/* Decorative SVGs - Moved inside a container with proper positioning */}
        <div className="absolute inset-x-0 bottom-0 h-[50vh] overflow-hidden pointer-events-none">
          <div className="relative w-full h-full">
            {/* Update the positioning of SVGs */}
            <motion.div
              className="absolute bottom-[10%] left-[10%]"
              style={{ 
                y: useTransform(scrollY, [0, 500], [0, 300]),
                scale: scaleRange,
                opacity: opacityRange 
              }}
            >
              {/* Circle SVG */}
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                <circle cx="30" cy="30" r="30" className="fill-slate-200/10 dark:fill-slate-400/10"/>
                <circle cx="30" cy="30" r="20" className="fill-slate-200/20 dark:fill-slate-400/20"/>
              </svg>
            </motion.div>

            <motion.div
              className="absolute bottom-[20%] right-[15%]"
              style={{ 
                y: useTransform(scrollY, [0, 500], [0, 400]),
                scale: scaleRange,
                opacity: opacityRange 
              }}
            >
              {/* Diamond SVG */}
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                <path d="M40 0L80 40L40 80L0 40L40 0Z" fill="rgba(100, 116, 139, 0.1)"/>
                <path d="M40 20L60 40L40 60L20 40L40 20Z" fill="rgba(100, 116, 139, 0.2)"/>
              </svg>
            </motion.div>

            <motion.div
              className="absolute bottom-[15%] left-[40%]"
              style={{ 
                y: useTransform(scrollY, [0, 500], [0, 200]),
                scale: scaleRange,
                opacity: opacityRange 
              }}
            >
              {/* Hexagon SVG */}
              <svg width="70" height="80" viewBox="0 0 70 80" fill="none">
                <path d="M35 0L70 20V60L35 80L0 60V20L35 0Z" fill="rgba(100, 116, 139, 0.15)"/>
                <path d="M35 20L52.5 30V50L35 60L17.5 50V30L35 20Z" fill="rgba(100, 116, 139, 0.25)"/>
              </svg>
            </motion.div>

            <motion.div
              className="absolute bottom-[25%] right-[30%]"
              style={{ 
                y: useTransform(scrollY, [0, 500], [0, 350]),
                rotate: useTransform(scrollY, [0, 500], [0, 180]),
                opacity: opacityRange 
              }}
            >
              {/* Spiral SVG */}
              <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
                <path
                  d="M50 50 C60 40, 40 20, 50 10 C60 0, 80 20, 90 50 C100 80, 80 100, 50 90"
                  stroke="rgba(100, 116, 139, 0.2)"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            </motion.div>
          </div>
        </div>

        {/* Social Proof Section - reduced padding */}
        <motion.div 
          className="max-w-6xl mx-auto py-12 px-4"
          variants={containerVariants}
        >
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-slate-800 dark:text-slate-100 mb-4">
              We help you discover amazing stories faster, easier and better
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              Let readers enjoy stories in any format they want, and writers create in whatever way works best for them.
            </p>
          </div>

          {/* Country Grid */}
          {/* <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-slate-600 dark:text-slate-400">
            <div>Writer in India 🇮🇳</div>
            <div>Poet from UK 🇬🇧</div>
            <div>Novelist in US 🇺🇸</div>
            <div>Creator from Japan 🇯🇵</div>
            <div>Author in France 🇫🇷</div>
          </div> */}
        </motion.div>

        {/* Enhanced Content Sections - reduced padding */}
        <motion.div 
          className="relative z-10 max-w-6xl mx-auto space-y-12 px-6 md:px-12 py-16"
          variants={containerVariants}
        >
          {/* Stats Section with darker theme */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6"
            variants={itemVariants}
          >
            {[
              { number: "10K+", label: "Active Writers" },
              { number: "50K+", label: "Published Stories" },
              { number: "100K+", label: "Monthly Readers" }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                className="text-center p-8 bg-white/80 dark:bg-gray-900/80 
                            rounded-3xl 
                           border border-purple-200 dark:border-gray-800 
                           shadow-[0_0_15px_rgba(147,51,234,0.05)] 
                           dark:shadow-[0_0_15px_rgba(0,0,0,0.3)]
                           hover:shadow-[0_0_30px_rgba(147,51,234,0.1)]
                           dark:hover:shadow-[0_0_30px_rgba(0,0,0,0.4)]
                           transition-all duration-300"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-5xl font-bold bg-gradient-to-r 
                             from-purple-600 via-purple-500 to-violet-500
                             dark:from-purple-400 dark:via-purple-300 dark:to-violet-300
                             bg-clip-text text-transparent mb-2">
                  {stat.number}
                </h3>
                <p className="text-slate-600 dark:text-gray-400 text-lg">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Features Section with darker theme */}
          <motion.div 
            className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto px-6 py-16"
            variants={itemVariants}
          >
            {[
              {
                icon: <FaPen className="text-4xl text-purple-600 dark:text-purple-400 mb-4" />,
                title: "Write Stories",
                description: "Create engaging content with our rich text editor. Share your unique perspective with readers worldwide."
              },
              {
                icon: <FaBook className="text-4xl text-violet-600 dark:text-violet-400 mb-4" />,
                title: "Read Stories",
                description: "Discover amazing content from writers worldwide. Get inspired by diverse perspectives and ideas."
              }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                className="bg-white/80 dark:bg-gray-900/80  p-8 rounded-xl 
                           border border-purple-200 dark:border-gray-800
                           shadow-[0_0_15px_rgba(147,51,234,0.05)] 
                           dark:shadow-[0_0_15px_rgba(0,0,0,0.3)]
                           hover:shadow-[0_0_30px_rgba(147,51,234,0.1)]
                           dark:hover:shadow-[0_0_30px_rgba(0,0,0,0.4)]
                           transition-all duration-300"
                whileHover={{ scale: 1.02 }}
              >
                {feature.icon}
                <h3 className="text-2xl font-bold bg-gradient-to-r 
                               from-purple-700 to-violet-600 
                               dark:from-purple-400 dark:to-violet-400 
                               bg-clip-text text-transparent mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-600 dark:text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Newsletter Section with darker theme */}
          <motion.div 
            className="py-8 bg-gradient-to-r from-purple-50/50 via-white to-violet-50/50
                         dark:from-gray-900/50 dark:via-black/50 dark:to-gray-900/50 
                         rounded-3xl border border-purple-200 dark:border-gray-800 
                         shadow-lg px-6 max-w-6xl mx-auto "
            variants={itemVariants}
          >
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold bg-gradient-to-r 
                             from-purple-700 to-violet-600
                             dark:from-purple-400 dark:to-violet-400 
                             bg-clip-text text-transparent mb-6">
                Stay Updated
              </h2>
              <p className="text-slate-600 dark:text-gray-400 mb-8">
                Get the latest stories and updates delivered to your inbox
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-6 py-3 rounded-full bg-white/80 dark:bg-gray-900/80 
                             border border-purple-200 dark:border-gray-800 
                             text-slate-800 dark:text-gray-200 
                             placeholder-slate-400 dark:placeholder-gray-500 
                             focus:outline-none focus:ring-2 focus:ring-purple-500/50 
                             dark:focus:ring-purple-400/50"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-gradient-to-r from-purple-700 to-violet-600 
                             dark:from-purple-600 dark:to-violet-500 
                             text-white rounded-full font-semibold 
                             hover:from-purple-800 hover:to-violet-700
                             dark:hover:from-purple-700 dark:hover:to-violet-600 
                             transition-all duration-300 shadow-lg hover:shadow-xl
                             dark:shadow-purple-500/10"
                >
                  Subscribe
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Footer - reduced padding */}
          <motion.footer 
            className="text-center py-4 border-t border-purple-200 dark:border-purple-900/30 max-w-6xl mx-auto"
            variants={itemVariants}
          >
            <p className="text-slate-600 dark:text-slate-400">
              Designed and Developed with{" "}
              <span className="text-purple-500 dark:text-purple-400">❤️</span> by{" "}
              <a 
                href="https://deepnav4.github.io/Portfolio/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-purple-600 to-violet-500
                           dark:from-purple-400 dark:to-violet-300
                           bg-clip-text text-transparent font-semibold 
                           hover:from-purple-700 hover:to-violet-600
                           dark:hover:from-purple-500 dark:hover:to-violet-400"
              >
                Navdeep
              </a>
            </p>
          </motion.footer>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;
