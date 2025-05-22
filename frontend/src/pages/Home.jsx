import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaPen, FaBook,  FaStar, FaQuoteLeft, FaQuoteRight, FaFeatherAlt, FaBookOpen, FaChartLine } from 'react-icons/fa';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import AppBar from '../components/AppBar';
import { useTheme } from '../context/ThemeContext';
import Loading from './Loading';

const ScrollingLogos = () => (
  <div className="w-full overflow-hidden bg-white/5 dark:bg-gray-900/30 py-4 sm:py-8">
    <div className="relative">
      <div className="flex animate-scroll-left space-x-8 sm:space-x-16 whitespace-nowrap">
        {/* First set of writers */}
        <div className="flex items-center space-x-8 sm:space-x-16">
          <span className="text-sm sm:text-base text-slate-500 dark:text-gray-400">Writer from India 🇮🇳</span>
          <span className="text-sm sm:text-base text-slate-500 dark:text-gray-400">Poet from UK 🇬🇧</span>
          <span className="text-sm sm:text-base text-slate-500 dark:text-gray-400">Novelist from US 🇺🇸</span>
          <span className="text-sm sm:text-base text-slate-500 dark:text-gray-400">Creator from Japan 🇯🇵</span>
          <span className="text-sm sm:text-base text-slate-500 dark:text-gray-400">Author from France 🇫🇷</span>
          <span className="text-sm sm:text-base text-slate-500 dark:text-gray-400">Storyteller from Canada 🇨🇦</span>
          <span className="text-sm sm:text-base text-slate-500 dark:text-gray-400">Writer from Australia 🇦🇺</span>
        </div>
        {/* Duplicate set for seamless scrolling */}
        <div className="flex items-center space-x-8 sm:space-x-16">
          <span className="text-sm sm:text-base text-slate-500 dark:text-gray-400">Writer from India 🇮🇳</span>
          <span className="text-sm sm:text-base text-slate-500 dark:text-gray-400">Poet from UK 🇬🇧</span>
          <span className="text-sm sm:text-base text-slate-500 dark:text-gray-400">Novelist from US 🇺🇸</span>
          <span className="text-sm sm:text-base text-slate-500 dark:text-gray-400">Creator from Japan 🇯🇵</span>
          <span className="text-sm sm:text-base text-slate-500 dark:text-gray-400">Author from France 🇫🇷</span>
          <span className="text-sm sm:text-base text-slate-500 dark:text-gray-400">Storyteller from Canada 🇨🇦</span>
          <span className="text-sm sm:text-base text-slate-500 dark:text-gray-400">Writer from Australia 🇦🇺</span>
        </div>
      </div>
      {/* Add gradient overlays for smooth fade effect */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white via-white/80 to-transparent dark:from-gray-950 dark:via-gray-950/80"></div>
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white via-white/80 to-transparent dark:from-gray-950 dark:via-gray-950/80"></div>
    </div>
  </div>
);

const TestimonialCard = ({ testimonial, index }) => {
  return (
    <motion.div 
      className="bg-white/80 dark:bg-gray-900/80 rounded-2xl shadow-lg p-6 
               dark:shadow-gray-900/20 border border-purple-100 dark:border-gray-800
               backdrop-blur-sm"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)" }}
    >
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-purple-600 to-violet-600 
                     dark:from-purple-500 dark:to-violet-500 flex items-center justify-center text-white 
                     font-bold mr-4 text-sm sm:text-base">
          {testimonial.name.charAt(0)}
        </div>
        <div>
          <h4 className="font-semibold text-base sm:text-lg dark:text-white">{testimonial.name}</h4>
          <div className="flex text-yellow-500">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className={`text-sm sm:text-base ${i < testimonial.rating ? "text-yellow-500" : "text-gray-300 dark:text-gray-600"}`} />
            ))}
          </div>
        </div>
      </div>
      <div className="relative">
        <FaQuoteLeft className="absolute -top-2 -left-1 text-purple-300 dark:text-purple-700 opacity-20 text-base sm:text-lg" />
        <p className="text-gray-700 dark:text-gray-300 mb-2 relative z-10 pl-4 text-sm sm:text-base">{testimonial.text}</p>
        <FaQuoteRight className="absolute -bottom-2 -right-1 text-purple-300 dark:text-purple-700 opacity-20 text-base sm:text-lg" />
      </div>
      <p className="text-xs sm:text-sm text-slate-500 dark:text-gray-400 mt-3">{testimonial.date}</p>
    </motion.div>
  );
};

// Number counter component for stats
const CountUp = ({ end, duration = 2, className }) => {
  const [count, setCount] = useState(0);
  const nodeRef = useRef(null);
  
  useEffect(() => {
    const handler = (entries) => {
      if (entries[0].isIntersecting) {
        let start = 0;
        const startVal = Math.floor(end * 0.4); // Start from 40% of the final value for better visual
        const step = Math.ceil(end / (duration * 60));
        const timer = setInterval(() => {
          start += step;
          if (start > end) {
            setCount(end);
            clearInterval(timer);
            return;
          }
          setCount(start);
        }, 16); 
        
        return () => clearInterval(timer);
      }
    };
    
    const observer = new IntersectionObserver(handler, {
      root: null,
      threshold: 0.1,
    });
    
    if (nodeRef.current) {
      observer.observe(nodeRef.current);
    }
    
    return () => {
      if (nodeRef.current) observer.unobserve(nodeRef.current);
    };
  }, [end, duration]);
  
  return <span ref={nodeRef} className={className}>{count}</span>;
};

const Home = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const [isLoading, setIsLoading] = useState(false);
  
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

  // Testimonials data
  const testimonials = [
    {
      name: "Emily Johnson",
      text: "This platform completely transformed my writing journey. The community support and exposure I've gained is incredible!",
      rating: 5,
      date: "May 15, 2023"
    },
    {
      name: "Michael Chen",
      text: "As an avid reader, I've found stories here that I couldn't find anywhere else. The recommendation system is spot on!",
      rating: 5,
      date: "June 3, 2023"
    },
    {
      name: "Sarah Williams",
      text: "The tools for writers are intuitive and powerful. My productivity has increased tenfold since I started using this platform.",
      rating: 4,
      date: "April 22, 2023"
    },
    {
      name: "David Rodriguez",
      text: "The dark mode is perfect for night reading, and the community is supportive and engaging. Couldn't ask for more!",
      rating: 5,
      date: "July 12, 2023"
    },
    {
      name: "Aisha Patel",
      text: "I love how easy it is to discover diverse voices from around the world. This platform truly celebrates global storytelling.",
      rating: 5,
      date: "March 8, 2023"
    },
    {
      name: "Thomas Wilson",
      text: "The reading experience is smooth and elegant. I especially appreciate the typography choices and customization options.",
      rating: 4,
      date: "August 17, 2023"
    }
  ];

  // Function to handle Get Started button click
  const handleGetStarted = () => {
    navigate('/blogs');
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <motion.div
        ref={containerRef}
        className="min-h-screen bg-gradient-to-br from-white via-purple-50/30 to-violet-50/20 
                   dark:from-gray-950 dark:via-gray-900 dark:to-gray-900
                   font-['Poppins',system-ui,-apple-system,sans-serif] transition-colors duration-500"
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
        
        {/* Hero Section - optimized mobile spacing */}
        <div className="relative min-h-[70vh] sm:min-h-[80vh] flex items-center justify-center px-3 sm:px-6 lg:px-8 sm:mt-0">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-slate-800 dark:text-white mb-3 sm:mb-4 leading-tight"
              variants={fadeInUpVariants}
            >
              Get thrilled
              <br />
              <span className="bg-gradient-to-r from-purple-600 via-purple-500 to-violet-500 
                             dark:from-purple-400 dark:via-purple-300 dark:to-violet-300 
                             bg-clip-text text-transparent animate-pulse-soft">
                same day
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-600 dark:text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto px-2 sm:px-4"
              variants={fadeInUpVariants}
            >
              By reading the most exciting stories on the planet.
            </motion.p>

            <motion.button
              variants={glowVariants}
              animate="animate"
              className="bg-gradient-to-r from-purple-600 via-purple-500 to-violet-500 
                         dark:from-purple-500 dark:via-purple-400 dark:to-violet-400
                         text-white px-6 sm:px-12 py-2.5 sm:py-4 rounded-full text-base sm:text-xl font-semibold 
                         hover:from-purple-700 hover:via-purple-600 hover:to-violet-600
                         dark:hover:from-purple-600 dark:hover:via-purple-500 dark:hover:to-violet-500
                         transition-all duration-300 shadow-lg hover:shadow-xl
                         dark:shadow-purple-500/20 hover:scale-105 active:scale-95"
              onClick={handleGetStarted}
            >
              Get Started
            </motion.button>

            <motion.p 
              className="mt-6 sm:mt-8 text-sm sm:text-base text-slate-500 dark:text-gray-400"
              variants={fadeInUpVariants}
            >
              Used by 5,000+ writers & readers in 129+ countries
            </motion.p>
          </div>
        </div>

        {/* ScrollingLogos - reduced mobile padding */}
        <div className="w-full overflow-hidden bg-white/5 dark:bg-gray-900/30 py-4 sm:py-8">
          <ScrollingLogos />
        </div>

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

        {/* Social Proof Section - optimized mobile spacing */}
        <motion.div 
          className="max-w-6xl mx-auto py-8 sm:py-16 px-3 sm:px-6 lg:px-8 mt-8 sm:mt-16"
          variants={containerVariants}
        >
          <div className="text-center mb-8 sm:mb-12">
            <motion.h2 
              className="text-2xl sm:text-3xl md:text-4xl font-normal bg-gradient-to-r from-purple-600 to-violet-500 
                      dark:from-purple-400 dark:to-violet-300 bg-clip-text text-transparent mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              We help you discover amazing stories
            </motion.h2>
            <motion.p 
              className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-gray-300 max-w-3xl mx-auto px-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Let readers enjoy stories in any format they want, and writers create in whatever way works best for them.
            </motion.p>
          </div>
        </motion.div>

        {/* Enhanced Content Sections - optimized spacing */}
        <motion.div 
          className="relative z-10 max-w-6xl mx-auto space-y-8 sm:space-y-16 px-3 sm:px-6 lg:px-8 py-8 sm:py-16"
          variants={containerVariants}
        >
          {/* Stats Section */}
          <motion.div className="relative z-10">
            <div className="text-center mb-8 sm:mb-12">
              <motion.h2 
                className="text-2xl sm:text-3xl md:text-4xl font-normal bg-gradient-to-r from-purple-600 to-violet-500 
                        dark:from-purple-400 dark:to-violet-300 bg-clip-text text-transparent mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                Our Impact in Numbers
              </motion.h2>
              <motion.p
                className="text-base sm:text-lg md:text-xl font-thin text-slate-600 dark:text-gray-300 max-w-2xl mx-auto px-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Join a thriving community of writers and readers making an impact on the world of storytelling
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8 max-w-6xl mx-auto">
              {[
                { number: 1000, display: "1K+", label: "Active Writers", icon: <FaFeatherAlt className="text-2xl sm:text-3xl mb-3 text-purple-600 dark:text-purple-400" /> },
                { number: 5000, display: "5K+", label: "Published Stories", icon: <FaBookOpen className="text-2xl sm:text-3xl mb-3 text-violet-600 dark:text-violet-400" /> },
                { number: 1000, display: "1K+", label: "Monthly Readers", icon: <FaChartLine className="text-2xl sm:text-3xl mb-3 text-indigo-600 dark:text-indigo-400" /> }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                  className="relative p-6 sm:p-8 bg-white/80 dark:bg-gray-900/80 rounded-3xl 
                           border border-purple-100 dark:border-gray-800
                           shadow-[0_10px_25px_-15px_rgba(0,0,0,0.1)] 
                           dark:shadow-[0_10px_25px_-15px_rgba(0,0,0,0.4)]
                           overflow-hidden group backdrop-blur-sm"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true, margin: "-50px" }}
                  whileHover={{ 
                    y: -5,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                  }}
                >
                  {/* Background gradient */}
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-tr from-purple-200/20 to-violet-200/30 
                                 dark:from-purple-800/20 dark:to-violet-700/30 rounded-full filter blur-md opacity-70 
                                 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative z-10 text-center">
                    {stat.icon}
                    <h3 className="text-4xl sm:text-6xl font-bold bg-gradient-to-r 
                             from-purple-600 via-purple-500 to-violet-500
                             dark:from-purple-400 dark:via-purple-300 dark:to-violet-300
                                bg-clip-text text-transparent mb-2 flex flex-col items-center justify-center h-20 sm:h-24">
                      <CountUp end={stat.number} className="text-4xl sm:text-6xl font-normal tracking-tight" />
                      <span className="text-xs sm:text-sm font-normal text-slate-500 dark:text-gray-400">{stat.display}</span>
                </h3>
                    <p className="text-slate-600 font-thin dark:text-gray-300 text-base sm:text-lg">{stat.label}</p>
                  </div>
              </motion.div>
            ))}
            </div>
          </motion.div>

          {/* Features Section */}
          <motion.div 
            className="relative z-10 py-8 sm:py-16 bg-gradient-to-b from-transparent via-purple-50/30 to-transparent
                      dark:from-transparent dark:via-gray-900/30 dark:to-transparent"
          >
            <div className="text-center mb-8 sm:mb-12">
              <motion.h2 
                className="text-2xl sm:text-3xl md:text-4xl font-normal bg-gradient-to-r from-purple-600 to-violet-500 
                        dark:from-purple-400 dark:to-violet-300 bg-clip-text text-transparent mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                Unleash Your Creativity
              </motion.h2>
              <motion.p
                className="text-base sm:text-lg md:text-xl font-thin text-slate-600 dark:text-gray-300 max-w-2xl mx-auto px-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Whether you're a writer or a reader, we've got you covered with powerful tools and seamless experiences
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 max-w-6xl mx-auto">
              {[
                {
                  icon: <FaPen className="text-2xl sm:text-3xl text-purple-600 dark:text-purple-400" />,
                title: "Write Stories",
                  description: "Create engaging content with our rich text editor. Share your unique perspective with readers worldwide.",
                  features: [
                    "Intuitive rich text editor",
                    "Real-time collaboration",
                    "Autosave functionality",
                    "SEO optimization tools"
                  ],
                  color: "from-purple-500 to-violet-500 dark:from-purple-400 dark:to-violet-400"
                },
                {
                  icon: <FaBook className="text-2xl sm:text-3xl text-violet-600 dark:text-violet-400" />,
                title: "Read Stories",
                  description: "Discover amazing content from writers worldwide. Get inspired by diverse perspectives and ideas.",
                  features: [
                    "Personalized recommendations",
                    "Offline reading mode",
                    "Adjustable text display",
                    "Bookmark favorite passages"
                  ],
                  color: "from-violet-500 to-indigo-500 dark:from-violet-400 dark:to-indigo-400"
              }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                  className="bg-white/80 dark:bg-gray-900/80 rounded-2xl 
                         border border-purple-100 dark:border-gray-800
                         shadow-lg dark:shadow-gray-900/20
                         overflow-hidden group backdrop-blur-sm"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true, margin: "-50px" }}
                  whileHover={{ 
                    y: -5,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                  }}
                >
                  <div className="p-6 sm:p-8">
                    <div className="flex items-center mb-6">
                      <h3 className="text-xl sm:text-2xl font-normal bg-gradient-to-r 
                                   from-purple-600 to-violet-500 
                               dark:from-purple-400 dark:to-violet-400 
                                   bg-clip-text text-transparent">
                  {feature.title}
                </h3>
                    </div>
                    
                    <p className="text-slate-600 dark:text-gray-300 mb-6 text-base sm:text-lg">{feature.description}</p>
                    
                    <ul className="space-y-3">
                      {feature.features.map((item, i) => (
                        <motion.li 
                          key={i}
                          className="flex items-start"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.4 + (i * 0.1) }}
                        >
                          <IoMdCheckmarkCircleOutline className="text-green-500 dark:text-green-400 mt-1 mr-2 flex-shrink-0" />
                          <span className="text-slate-600 dark:text-gray-300 text-sm sm:text-base">{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                    
                    <motion.button
                      className={`mt-8 px-4 sm:px-6 py-2 rounded-full bg-gradient-to-r ${feature.color} 
                               text-white font-medium text-sm sm:text-base
                               shadow-md hover:shadow-lg transition-all duration-300
                               flex items-center space-x-2`}
                      whileHover={{ scale: 1.03, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleGetStarted}
                    >
                      <span>{feature.title.includes("Write") ? "Start Writing" : "Start Reading"}</span>
                      <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </motion.button>
                  </div>
              </motion.div>
            ))}
            </div>
          </motion.div>
          
          {/* Testimonial Section */}
          <motion.div className="py-8 sm:py-16 px-3 sm:px-4">
            <div className="text-center mb-8 sm:mb-12">
              <motion.h2 
                className="text-2xl sm:text-3xl md:text-4xl font-normal bg-gradient-to-r from-purple-600 to-violet-500 
                          dark:from-purple-400 dark:to-violet-300 bg-clip-text text-transparent mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                What Our Readers Say
              </motion.h2>
              <motion.p
                className="text-base sm:text-lg md:text-xl font-thin text-slate-600 dark:text-gray-300 max-w-2xl mx-auto px-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Join thousands of satisfied readers who have discovered amazing stories on our platform
              </motion.p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 max-w-6xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard key={index} testimonial={testimonial} index={index} />
              ))}
            </div>
          </motion.div>

          {/* Newsletter Section - optimized mobile spacing */}
          <motion.div 
            className="py-8 sm:py-12 bg-white/80 dark:bg-gray-900/80 rounded-2xl 
                       shadow-lg dark:shadow-gray-900/20 border border-purple-100 dark:border-gray-800
                       backdrop-blur-sm px-4 sm:px-8 max-w-6xl mx-auto"
            variants={itemVariants}
            whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)" }}
            transition={{ duration: 0.3 }}
          >
            <div className="max-w-3xl mx-auto text-center">
              <motion.h2 
                className="text-3xl sm:text-4xl font-normal bg-gradient-to-r from-purple-600 to-violet-500 
                          dark:from-purple-400 dark:to-violet-300 bg-clip-text text-transparent mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                Stay Updated
              </motion.h2>
              <motion.p 
                className="text-base sm:text-lg font-thin text-slate-600 dark:text-gray-300 mb-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Get the latest stories and updates delivered to your inbox
              </motion.p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full sm:w-auto min-w-[300px] px-6 py-3 rounded-full 
                           bg-white/80 dark:bg-gray-800/80 
                           border border-purple-100 dark:border-gray-800
                             text-slate-800 dark:text-gray-200 
                             placeholder-slate-400 dark:placeholder-gray-500 
                             focus:outline-none focus:ring-2 focus:ring-purple-500/50 
                           dark:focus:ring-purple-400/50
                           backdrop-blur-sm"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r 
                           from-purple-600 via-purple-500 to-violet-500
                           dark:from-purple-500 dark:via-purple-400 dark:to-violet-400
                           text-white rounded-full font-medium text-sm sm:text-base
                           hover:from-purple-700 hover:via-purple-600 hover:to-violet-600
                           dark:hover:from-purple-600 dark:hover:via-purple-500 dark:hover:to-violet-500
                             transition-all duration-300 shadow-lg hover:shadow-xl
                           dark:shadow-purple-500/20"
                >
                  Subscribe
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Footer - optimized mobile spacing */}
          <motion.footer 
            className="text-center py-6 sm:py-8 border-t border-purple-100 dark:border-gray-800 max-w-6xl mx-auto"
            variants={itemVariants}
          >
            <p className="text-slate-600 dark:text-gray-300">
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
                         dark:hover:from-purple-500 dark:hover:to-violet-400
                         transition-all duration-300"
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
