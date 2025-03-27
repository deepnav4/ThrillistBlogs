import axios from "axios"
// import Appbar from "../components/Appbar"
// import { BACKEND_URL } from "../config"
const BACKEND_URL = "http://localhost:3001"
import { useState } from "react"
import { useNavigate, Navigate } from "react-router-dom"
import { motion } from "framer-motion"
import AppBar from "../components/AppBar"
import { useTheme } from '../context/ThemeContext';
  
const MarkdownPreview = ({ content, title }) => {
  const formatContent = (content) => {
    if (!content) return '';
    
    try {
      return content
        .replace(/#(.*?)#/g, '<h1 class="text-2xl font-bold font-inter text-gray-900 dark:text-gray-100 py-4 my-2 border-b border-gray-200 dark:border-gray-700">$1</h1>')
        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold font-inter py-2 px-1 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-900 dark:text-yellow-100">$1</strong>')
        .replace(/\*(.*?)\*/g, '<em class="italic font-inter py-2 px-1 text-gray-700 dark:text-gray-300">$1</em>')
        .replace(/\$(.*?)\$/g, '<a href="$1" class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-inter underline px-1 py-0.5 bg-blue-50 dark:bg-blue-900/20 rounded transition-all duration-300" target="_blank" rel="noopener noreferrer">$1</a>')
        .replace(/```(\w+)?\n([\s\S]*?)```/g, (match, language, code) => `
          <div class="my-4 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
            ${language ? 
              `<div class="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-sm font-medium border-b border-gray-200 dark:border-gray-700">${language}</div>` 
              : ''
            }
            <pre class="p-4 overflow-x-auto bg-white dark:bg-gray-900"><code class="text-gray-800 dark:text-gray-200 font-mono text-sm whitespace-pre">${code}</code></pre>
          </div>
        `.trim())
        .replace(/`([^`]+)`/g, '<code class="bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-2 py-0.5 rounded font-mono text-sm border border-gray-200 dark:border-gray-700">$1</code>')
        .replace(/\n/g, '<br>');
    } catch (error) {
      console.error("Error formatting content:", error);
      return content;
    }
  };

  const placeholderContent = !content && !title ? (
    <div className="text-gray-400 dark:text-gray-500">
      <h1 className="text-3xl font-bold mb-4 text-gray-300 dark:text-gray-600">Your Title Will Appear Here</h1>
      <div className="space-y-4">
        <p>#This is how a heading looks#</p>
        <p>Regular text will appear like this.</p>
        <p>You can make text **bold** or *italic*.</p>
        <p>Add links like this: $https://example.com$</p>
        <p>Add code like this: `code`</p>
        <p>Add code block like this: ```javascript code```</p>
      </div>
    </div>
  ) : (
    <>
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-4">
        {title || "Untitled Story"}
      </h1>
      <div
        className="text-gray-700 dark:text-gray-300 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: formatContent(content) }}
      />
    </>
  );

  return (
    <motion.div
      className="bg-gradient-to-br from-white dark:from-gray-800 to-gray-50 dark:to-gray-900 rounded-xl p-8 border border-gray-100 dark:border-gray-700 prose dark:prose-invert max-w-none shadow-sm overflow-auto resize-y min-h-[500px] h-[calc(100vh-16rem)]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      style={{ resize: 'vertical' }}
    >
      <div className="flex items-center justify-between mb-6 sticky top-0 bg-gradient-to-br from-white dark:from-gray-800 to-gray-50 dark:to-gray-900 py-2">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Preview</h3>
        <span className="text-sm text-gray-500 dark:text-gray-400">Live updates as you type</span>
      </div>
      <div className="preview-content">
        {placeholderContent}
      </div>
    </motion.div>
  );
};

const TextArea = ({value, onChange}) => {
  return (
    <motion.div 
      className="mt-3"
    >
      <div className="flex flex-wrap gap-2 mb-1">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onChange({ target: { value: value + '\n# ' } })}
          className="px-3 py-1 text-sm bg-purple-50 dark:bg-purple-900/30 
                    text-purple-600 dark:text-purple-300 rounded-full 
                    hover:bg-purple-100 dark:hover:bg-purple-800/30 transition-colors"
          title="Heading"
        >
          H1
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onChange({ target: { value: value + '**' } })}
          className="px-3 py-1 text-sm bg-purple-50 dark:bg-purple-900/30 
                    text-purple-600 dark:text-purple-300 rounded-full 
                    hover:bg-purple-100 dark:hover:bg-purple-800/30 font-bold"
          title="Bold"
        >
          B
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onChange({ target: { value: value + '*' } })}
          className="px-3 py-1 text-sm bg-purple-50 dark:bg-purple-900/30 
                    text-purple-600 dark:text-purple-300 rounded-full 
                    hover:bg-purple-100 dark:hover:bg-purple-800/30 italic"
          title="Italic"
        >
          I
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onChange({ target: { value: value + '$' } })}
          className="px-3 py-1 text-sm bg-purple-50 dark:bg-purple-900/30 
                    text-purple-600 dark:text-purple-300 rounded-full 
                    hover:bg-purple-100 dark:hover:bg-purple-800/30 underline"
          title="Link"
        >
          L
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onChange({ target: { value: value + '`' } })}
          className="px-3 py-1 text-sm bg-purple-50 dark:bg-purple-900/30 
                    text-purple-600 dark:text-purple-300 rounded-full 
                    hover:bg-purple-100 dark:hover:bg-purple-800/30 font-mono border border-gray-200 dark:border-gray-700"
          title="Inline Code"
        >
          <code>{'<>'}</code>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onChange({ target: { value: value + '\n```javascript\n\n```' } })}
          className="px-3 py-1 text-sm bg-purple-50 dark:bg-purple-900/30 
                    text-purple-600 dark:text-purple-300 rounded-full 
                    hover:bg-purple-100 dark:hover:bg-purple-800/30 font-mono border border-gray-200 dark:border-gray-700"
          title="Code Block"
        >
          {'{ }'}
        </motion.button>
        <div className="flex-1 text-right">
          <span className="text-sm text-gray-500">Markdown supported</span>
        </div>
      </div>
      
      <motion.div 
        className="mb-3 p-4 bg-white dark:bg-gray-800 rounded-lg 
                  border border-gray-200 dark:border-gray-700 text-sm"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Quick Format:</p>
            <ul className="text-gray-600 dark:text-gray-400 text-xs space-y-0.5">
              <li>• <code className="bg-gray-50 dark:bg-gray-700 px-1 rounded text-gray-700 dark:text-gray-300">#Text#</code> - Heading</li>
              <li>• <code className="bg-gray-50 dark:bg-gray-700 px-1 rounded text-gray-700 dark:text-gray-300">**Text**</code> - Bold</li>
              <li>• <code className="bg-gray-50 dark:bg-gray-700 px-1 rounded text-gray-700 dark:text-gray-300">*Text*</code> - Italic</li>
              <li>• <code className="bg-gray-50 dark:bg-gray-700 px-1 rounded text-gray-700 dark:text-gray-300">$URL$</code> - Link</li>
              <li>• <code className="bg-gray-50 dark:bg-gray-700 px-1 rounded text-gray-700 dark:text-gray-300">`code`</code> - Inline Code</li>
              <li>• <code className="bg-gray-50 dark:bg-gray-700 px-1 rounded text-gray-700 dark:text-gray-300">```language
                code
                ```</code> - Code Block</li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Tips:</p>
            <ul className="text-gray-600 dark:text-gray-400 text-xs space-y-0.5">
              <li>• Use headings for sections</li>
              <li>• Bold for key points</li>
              <li>• Italic for emphasis</li>
              <li>• Links for references</li>
              <li>• Use inline code for short snippets</li>
              <li>• Code blocks support syntax highlighting</li>
            </ul>
          </div>
        </div>
      </motion.div>

      <motion.textarea
        className="w-full h-[calc(100vh-24rem)] rounded-lg 
                  bg-white dark:bg-gray-800 p-4 
                  text-base text-gray-800 dark:text-gray-200 
                  border border-gray-100 dark:border-gray-700
                  focus:ring-2 focus:ring-purple-500/40 dark:focus:ring-purple-400/40 
                  focus:outline-none
                  transition-all duration-300 ease-in-out mb-3"
        placeholder="Write your story..."
        value={value}
        onChange={onChange}
        whileFocus={{ scale: 1.01 }}
      />
    </motion.div>
  )
}

const Publish = () => {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const navigate = useNavigate()
    const { theme } = useTheme()
    const isAuthenticated = localStorage.getItem('token');

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return (
      <div className={theme === 'dark' ? 'dark' : ''}>
        <AppBar theme={theme} />
        <motion.div 
          className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 pt-24 pb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="px-4 md:px-8 max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-3">
                <motion.input 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-lg bg-white dark:bg-gray-800 p-3
                  text-lg font-semibold text-gray-900 dark:text-gray-100 
                  border border-gray-100 dark:border-gray-700
                  focus:ring-2 focus:ring-indigo-500/40 dark:focus:ring-indigo-400/40 
                  focus:outline-none"
                  type="text"
                  placeholder="Enter your title..."
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileFocus={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                />
                
                <TextArea 
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
                
                <motion.button 
                  onClick={() => {
                    axios.post(`${BACKEND_URL}/api/v1/blog`, {
                      title,
                      content   
                    }, {
                      headers: {
                        Authorization: localStorage.getItem("token")
                      }
                    })
                    .then((res) => {
                      if (res.data && res.data.blog && res.data.blog._id) {
                        navigate(`/blog/${res.data.blog._id}`);
                      } else {
                        console.error('Blog response structure:', res.data);
                        alert('Error: Blog ID not found in response. Check console for details.');
                      }
                    })
                    .catch((error) => {
                      console.error('Error creating blog:', error);
                      alert('Error creating blog post. Please try again.');
                    });
                  }}
                  className="w-full px-4 py-2.5 bg-indigo-600 dark:bg-indigo-500 
                           text-white rounded-lg text-sm font-medium 
                           hover:bg-indigo-700 dark:hover:bg-indigo-600
                           transition-colors duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Publish Story
                </motion.button>
              </div>

              <div className="sticky top-24">
                <MarkdownPreview content={content} title={title} />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    )
}

export default Publish