import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAI } from '../context/AIContext';

const AISettings = () => {
  const { apiKey, isAIEnabled, updateApiKey, toggleAI } = useAI();
  const [isOpen, setIsOpen] = useState(false);
  const [tempKey, setTempKey] = useState(apiKey);
  const [showKey, setShowKey] = useState(false);
  
  const handleSave = () => {
    updateApiKey(tempKey);
    setIsOpen(false);
  };
  
  const maskApiKey = (key) => {
    if (!key) return '';
    return key.length > 8 
      ? `${key.substring(0, 4)}...${key.substring(key.length - 4)}`
      : '****';
  };

  return (
    <div className="relative">
      {/* AI Toggle Button */}
      <motion.button
        className={`flex items-center space-x-1 px-3 py-1.5 rounded-full text-sm ${
          isAIEnabled 
            ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' 
            : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
        } transition-colors`}
        onClick={() => {
          if (!apiKey) {
            setIsOpen(true);
          } else {
            toggleAI();
          }
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          className="w-4 h-4"
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M12 2a4 4 0 0 1 4 4m-8 8a4 4 0 0 1-4-4m0 0a4 4 0 0 1 4-4m8 8a4 4 0 0 1 4 4m0 0a4 4 0 0 1-4 4"></path>
          <circle cx="12" cy="12" r="3"></circle>
        </svg>
        <span className="mr-1">
          {isAIEnabled ? 'AI: On' : 'AI: Off'}
        </span>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(true);
          }}
          className="ml-1 w-5 h-5 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            className="w-3 h-3"
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="1"></circle>
            <circle cx="12" cy="5" r="1"></circle>
            <circle cx="12" cy="19" r="1"></circle>
          </svg>
        </button>
      </motion.button>

      {/* AI Settings Modal */}
      {isOpen && (
        <motion.div 
          className="absolute right-0 top-full mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4 w-64 z-50"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">AI Settings</h3>
          
          <div className="mb-4">
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Google API Key
            </label>
            <div className="relative">
              <input 
                type={showKey ? "text" : "password"}
                value={tempKey} 
                onChange={(e) => setTempKey(e.target.value)}
                className="w-full px-3 py-1.5 text-sm rounded border border-gray-200 dark:border-gray-700 
                          bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200
                          focus:ring-2 focus:ring-indigo-500/40 dark:focus:ring-indigo-400/40 focus:outline-none"
                placeholder="Enter your Google API key"
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                onClick={() => setShowKey(!showKey)}
              >
                {showKey ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
            {apiKey && (
              <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Current: {maskApiKey(apiKey)}
              </div>
            )}
          </div>

          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={isAIEnabled}
                onChange={toggleAI}
                disabled={!apiKey}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                Enable AI text prediction
              </span>
            </label>
          </div>
          
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-4">
            AI will suggest text as you write. Press Tab to accept suggestions.
          </div>
          
          <div className="flex space-x-2">
            <motion.button
              className="px-3 py-1.5 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700 transition-colors"
              onClick={handleSave}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Save
            </motion.button>
            <motion.button
              className="px-3 py-1.5 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              onClick={() => setIsOpen(false)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Cancel
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default AISettings; 