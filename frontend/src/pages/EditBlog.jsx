import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AppBar from '../components/AppBar';
import Loading from './Loading';
import ErrorPage from './ErrorPage';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import { config } from '../config/config';

const BACKEND_URL = "http://localhost:3001/api/v1";

// Import MarkdownPreview and TextArea from Publish page
// You can also move these components to a separate file and import them in both places
const MarkdownPreview = ({ content, title }) => {
  const formatContent = (content) => {
    if (!content) return '';
    
    try {
      return content
        .replace(/#(.*?)#/g, '<h1 class="text-2xl font-bold font-inter text-gray-900 dark:text-gray-100 py-4 my-2 border-b border-gray-200/30 dark:border-gray-700/50">$1</h1>')
        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold font-inter py-0.5 bg-yellow-50/30 dark:bg-yellow-900/20 text-yellow-900 dark:text-yellow-100 rounded-sm">$1</strong>')
        .replace(/\*(.*?)\*/g, '<em class="italic font-inter py-0.5 text-gray-700 dark:text-gray-300">$1</em>')
        .replace(/\$(.*?)\$/g, '<a href="$1" class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-inter underline px-1 py-0.5 bg-blue-50/30 dark:bg-blue-900/20 rounded transition-all duration-300" target="_blank" rel="noopener noreferrer">$1</a>')
        .replace(/```(\w+)?\n([\s\S]*?)```/g, (match, language, code) => `
          <div class="my-4 rounded-lg overflow-hidden border border-gray-200/30 dark:border-gray-700/50 backdrop-blur-sm">
            ${language ? 
              `<div class="px-4 py-2 bg-gray-100/70 dark:bg-gray-800/70 text-gray-600 dark:text-gray-400 text-sm font-medium border-b border-gray-200/30 dark:border-gray-700/50 backdrop-blur-sm">${language}</div>` 
              : ''
            }
            <pre class="p-4 overflow-x-auto bg-white/10 dark:bg-gray-900/40 backdrop-blur-sm"><code class="text-gray-800 dark:text-gray-200 font-mono text-sm whitespace-pre">${code}</code></pre>
          </div>
        `.trim())
        .replace(/`([^`]+)`/g, '<code class="bg-gray-50/50 dark:bg-gray-800/50 text-gray-800 dark:text-gray-200 px-2 py-0.5 rounded-sm font-mono text-sm border border-gray-200/30 dark:border-gray-700/50 backdrop-blur-sm">$1</code>')
        .replace(/\n/g, '<br>');
    } catch (error) {
      console.error("Error formatting content:", error);
      return content;
    }
  };

  const placeholderContent = !content && !title ? (
    <div className="text-gray-400/70 dark:text-gray-500/70">
      <h1 className="text-3xl font-bold mb-4 text-gray-300/80 dark:text-gray-600/80">Your Title Will Appear Here</h1>
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
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100 border-b border-gray-200/30 dark:border-gray-700/50 pb-4">
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
      className="bg-white/20 dark:bg-gray-800/20 rounded-xl p-8 border border-gray-100/30 dark:border-gray-700/30 prose dark:prose-invert max-w-none shadow-lg backdrop-blur-sm overflow-auto resize-y min-h-[500px] h-[calc(100vh-16rem)]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      style={{ resize: 'vertical' }}
    >
      <div className="flex items-center justify-between mb-6 sticky top-0 left-0 z-10 bg-white/100 dark:bg-gray-800/70 backdrop-blur-md py-2 px-4 rounded-lg border border-gray-100/30 dark:border-gray-700/30 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Preview</h3>
        <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100/50 dark:bg-gray-700/50 px-3 py-1.5 rounded-full backdrop-blur-sm border border-gray-200/30 dark:border-gray-600/30">Live updates as you type</span>
      </div>
      <div className="preview-content">
        {placeholderContent}
      </div>
    </motion.div>
  );
};

const TextArea = ({value, onChange}) => {
  const formatOptions = [
    { label: 'H1', action: () => onChange({ target: { value: value + '#' } }), tooltip: 'Heading', className: 'bg-purple-50/70 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300' },
    { label: 'B', action: () => onChange({ target: { value: value + '**' } }), tooltip: 'Bold', className: 'bg-blue-50/70 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 font-bold' },
    { label: 'I', action: () => onChange({ target: { value: value + '*' } }), tooltip: 'Italic', className: 'bg-green-50/70 dark:bg-green-900/30 text-green-600 dark:text-green-300 italic' },
    { label: 'L', action: () => onChange({ target: { value: value + '$' } }), tooltip: 'Link', className: 'bg-amber-50/70 dark:bg-amber-900/30 text-amber-600 dark:text-amber-300 underline' },
    { label: '<>', action: () => onChange({ target: { value: value + '`' } }), tooltip: 'Inline Code', className: 'bg-red-50/70 dark:bg-red-900/30 text-red-600 dark:text-red-300 font-mono' },
    { label: '{ }', action: () => onChange({ target: { value: value + '\n```javascript\n\n```' } }), tooltip: 'Code Block', className: 'bg-indigo-50/70 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 font-mono' },
  ];

  return (
    <motion.div 
      className="mt-3"
    >
      <div className="flex flex-wrap gap-2 mb-3">
        {formatOptions.map((option, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={option.action}
            className={`px-3 py-1 text-sm ${option.className} rounded-full hover:shadow-md transition-all duration-200 backdrop-blur-sm`}
            title={option.tooltip}
          >
            {option.label}
          </motion.button>
        ))}
        <div className="flex-1 text-right">
          <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100/50 dark:bg-gray-700/50 px-3 py-1 rounded-full inline-block backdrop-blur-sm">Markdown supported</span>
        </div>
      </div>
      
      {/* <div className="mb-4 p-3 bg-white/20 dark:bg-gray-800/20 rounded-lg border border-gray-100/30 dark:border-gray-700/30 text-sm backdrop-blur-sm">
        <div className="flex text-xs text-gray-600 dark:text-gray-400 gap-6 items-start">
          <div className="flex-1 flex space-x-4">
            <span className="whitespace-nowrap font-medium text-gray-700 dark:text-gray-300">Format:</span>
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              <div><code className="bg-gray-50/50 dark:bg-gray-700/50 px-1 rounded">#Heading#</code></div>
              <div><code className="bg-gray-50/50 dark:bg-gray-700/50 px-1 rounded">**Bold**</code></div>
              <div><code className="bg-gray-50/50 dark:bg-gray-700/50 px-1 rounded">*Italic*</code></div>
              <div><code className="bg-gray-50/50 dark:bg-gray-700/50 px-1 rounded">$Link$</code></div>
              <div><code className="bg-gray-50/50 dark:bg-gray-700/50 px-1 rounded">`Code`</code></div>
            </div>
          </div>
          <div className="border-l border-gray-200/30 dark:border-gray-700/50 pl-6 flex-1">
            <div className="flex items-center gap-1 mb-1">
              <span className="rounded-full bg-indigo-100 dark:bg-indigo-900/30 w-4 h-4 flex items-center justify-center text-xs text-indigo-600 dark:text-indigo-300">✓</span>
              <span className="font-medium text-gray-700 dark:text-gray-300">Tips:</span>
            </div>
            <p>Use headings for sections, bold for key points, and code blocks support syntax highlighting.</p>
          </div>
        </div>
      </div> */}

      <motion.textarea
        className="w-full h-[calc(100vh-18rem)] rounded-xl 
                  bg-white/20 dark:bg-gray-800/20 p-5 
                  text-base text-gray-800 dark:text-gray-200 
                  border border-gray-100/30 dark:border-gray-700/30
                  focus:ring-2 focus:ring-purple-500/40 dark:focus:ring-purple-400/40 
                  focus:outline-none shadow-lg
                  transition-all duration-300 ease-in-out mb-3
                  backdrop-blur-sm"
        placeholder="Write your story..."
        value={value}
        onChange={onChange}
        whileFocus={{ scale: 1.01 }}
      />
    </motion.div>
  )
}

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/blog/${id}`, {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        });
        setTitle(response.data.blog.title);
        setContent(response.data.blog.content);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch blog');
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${BACKEND_URL}/blog/${id}/update`, 
        { title, content },
        {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        }
      );
      navigate(`/blog/${id}`);
    } catch (error) {
      setError('Failed to update blog');
    }
  };

  if (loading) return <Loading />;

  if (error) return <ErrorPage message={error} />;

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <AppBar theme={theme} />
      <motion.div 
        className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 pt-20 pb-8"
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
                className="w-full rounded-xl bg-white/20 dark:bg-gray-800/20 p-4
                    text-lg font-medium text-gray-900 dark:text-gray-100 
                    border border-gray-100/30 dark:border-gray-700/30
                    focus:ring-2 focus:ring-indigo-500/40 dark:focus:ring-indigo-400/40 
                    focus:outline-none shadow-lg backdrop-blur-sm"
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
                onClick={handleSubmit}
                className="w-full px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500 
                        text-white rounded-xl text-sm font-medium shadow-lg
                        hover:from-indigo-700 hover:to-purple-700 dark:hover:from-indigo-600 dark:hover:to-purple-600
                        transition-all duration-300"
                whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgba(79, 70, 229, 0.4)" }}
                whileTap={{ scale: 0.98 }}
              >
                Update Story
              </motion.button>
            </div>

            <div className="sticky top-24">
              <MarkdownPreview content={content} title={title} />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default EditBlog;
