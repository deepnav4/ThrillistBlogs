import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AppBar from '../components/AppBar';
import { useTheme } from '../context/ThemeContext';

const Loading = () => {
  const { theme } = useTheme();
  const [loadingText, setLoadingText] = useState('');
  const [dotCount, setDotCount] = useState(0);

  const loadingThoughts = [
    "Gathering fresh inspiration",
    "Brewing creative ideas",
    "Curating content just for you",
    "Assembling thoughts and stories",
    "Connecting with the writing universe",
    "Polishing the perfect words",
    "Crafting digital narratives",
    "Preparing your writing canvas",
    "Summoning literary genius",
    "Unlocking creative potential",
    "Collecting brilliant thoughts",
    "Organizing a symphony of words",
    "Channeling your inner storyteller",
    "Arranging a mosaic of ideas",
    "Kindling the fire of imagination"
  ];

  useEffect(() => {
    // Randomly select a loading message
    const randomIndex = Math.floor(Math.random() * loadingThoughts.length);
    setLoadingText(loadingThoughts[randomIndex]);
    
    // Animate the dots
    const dotInterval = setInterval(() => {
      setDotCount(prev => (prev + 1) % 4);
    }, 400);
    
    return () => clearInterval(dotInterval);
  }, []);

  const dots = '.'.repeat(dotCount);
  
  // Staggered animation variants for the circles
  const circleVariants = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const circleItem = {
    initial: { y: 0, opacity: 0.5 },
    animate: {
      y: [0, -15, 0],
      opacity: [0.5, 1, 0.5],
      transition: {
        repeat: Infinity,
        duration: 1.5,
        ease: "easeInOut"
      }
    }
  };

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
            <motion.h1 
              className="text-2xl font-medium text-gray-900 dark:text-gray-100 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {loadingText}{dots}
            </motion.h1>
            
            <motion.div 
              className="flex justify-center space-x-3 mt-6"
              variants={circleVariants}
              initial="initial"
              animate="animate"
            >
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-3 h-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
                  variants={circleItem}
                  custom={i}
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </motion.div>

            <motion.div 
              className="mt-12 text-sm text-gray-600 dark:text-gray-400 italic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              "The scariest moment is always just before you start." 
              <div className="mt-1 font-medium">― Stephen King</div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="mt-8 text-center text-gray-600 dark:text-gray-400 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <p>This may take a moment depending on your connection</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
