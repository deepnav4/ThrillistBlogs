import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BACKEND_URL } from '../config'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useTheme } from '../context/ThemeContext'

const FloatingElements = () => (
    <g className="floating-elements">
        <circle className="animate-float-slow" cx="320" cy="80" r="8" fill="#FFB5B5" />
        <circle className="animate-float-medium" cx="350" cy="140" r="6" fill="#95CED1" />
        <circle className="animate-float-fast" cx="290" cy="120" r="4" fill="#FFD93D" />
        <path 
            className="animate-float-slow" 
            d="M310 200 L320 190 L330 200 L320 210 Z" 
            fill="#95CED1"
        />
        <path 
            className="animate-float-medium" 
            d="M280 150 L290 140 L300 150 L290 160 Z" 
            fill="#FFB5B5"
        />
    </g>
);

const ReadingGirlSVG = () => (
    <svg 
        viewBox="0 0 400 400" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
    >
        <FloatingElements />
        
        <g transform="translate(50, 50)">
            {/* Book */}
            <path 
                d="M100 200 L300 200 L300 250 Q200 270 100 250 Z" 
                fill="#f0f0f0" 
                stroke="#333" 
                strokeWidth="2"
            />
            
            {/* Girl's body */}
            <path 
                d="M150 100 Q200 100 220 150 Q240 200 220 250" 
                fill="none" 
                stroke="#333" 
                strokeWidth="3"
            />
            
            {/* Girl's hair */}
            <path 
                d="M140 80 Q200 60 220 100 Q240 120 220 140" 
                fill="#ff6b6b" 
                stroke="#e95555" 
                strokeWidth="2"
            />
            
            {/* Cat silhouette */}
            <path 
                d="M280 180 Q290 170 300 180 L310 170 L300 190 Q290 200 280 190 Z" 
                fill="#gray" 
            />
            
            {/* Book pages - lines */}
            <path 
                d="M120 210 L280 210 M120 220 L280 220 M120 230 L280 230" 
                stroke="#ddd" 
                strokeWidth="1"
            />
        </g>
    </svg>
);

const Auth = ({type}) => {
    const navigate = useNavigate();
    const [inputs,setInputs] = useState({
        name : "",
        email : "",
        password : ""
    })
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const { theme } = useTheme();

    const handleSubmit = async(e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        try {
            const response = await axios.post(`${BACKEND_URL}/user/${type}`, {
                name: inputs.name,
                email: inputs.email,
                password: inputs.password  
            });
            
            if (response.status === 200) {
                localStorage.setItem('token', response.data.token);
                setSuccess("Successfully logged in!");
                setTimeout(() => {
                    navigate("/blogs");
                }, 1500);
            }
            else if (response.status === 201) {
                setSuccess("Account created successfully!");
                setTimeout(() => {
                    navigate("/login");
                }, 1500);
            }
        } catch (error) {
            console.error("Authentication error:", error);
            if (error.response) {
                setError(error.response.data.message || "Authentication failed. Please try again.");
            } else {
                setError("Network error. Please check your connection.");
            }
        }
    }

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    const inputVariants = {
        focus: { scale: 1.02, transition: { duration: 0.2 } }
    };

    return (
        <div className='flex min-h-screen bg-gradient-to-br from-white via-purple-50/30 to-violet-50/20 
                        dark:from-black dark:via-gray-900 dark:to-gray-950 
                        p-4 pt-20 transition-colors duration-500'>
            <motion.div 
                className='w-full max-w-md mx-auto'
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <motion.div 
                    className='bg-white/80 dark:bg-gray-900/80  p-8 rounded-xl 
                             border border-purple-200 dark:border-gray-800
                             shadow-[0_0_15px_rgba(147,51,234,0.05)] 
                             dark:shadow-[0_0_15px_rgba(0,0,0,0.3)]
                             hover:shadow-[0_0_30px_rgba(147,51,234,0.1)]
                             dark:hover:shadow-[0_0_30px_rgba(0,0,0,0.4)]
                             transition-all duration-300'
                    whileHover={{ scale: 1.01 }}
                >
                    <motion.h1 
                        className='text-2xl font-bold mb-2 bg-gradient-to-r 
                                 from-purple-700 to-violet-600 
                                 dark:from-purple-400 dark:to-violet-400 
                                 bg-clip-text text-transparent'
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        {type === "signup" ? "Create Account" : "Welcome Back"}
                    </motion.h1>
                    <motion.p 
                        className='text-slate-600 dark:text-gray-400 text-sm mb-6'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        {type === "signup" 
                            ? "Sign up to start your journey"
                            : "Sign in to continue"}
                    </motion.p>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {type === "signup" && (
                            <Input
                                label="Name"
                                placeholder="Enter your name"
                                type="text"
                                value={inputs.name}
                                onChange={(e) => setInputs({...inputs, name: e.target.value})}
                            />
                        )}
                        <Input
                            label="Email"
                            placeholder="Enter your email"
                            type="email"
                            value={inputs.email}
                            onChange={(e) => setInputs({...inputs, email: e.target.value})}
                        />
                        <Input
                            label="Password"
                            placeholder="Enter your password"
                            type="password"
                            value={inputs.password}
                            onChange={(e) => setInputs({...inputs, password: e.target.value})}
                        />
                        
                        {error && (
                            <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm">
                                {error}
                            </div>
                        )}
                        {success && (
                            <div className="p-3 rounded-lg bg-green-50 text-green-600 text-sm">
                                {success}
                            </div>
                        )}

                        <motion.button
                            type="submit"
                            className="w-full py-3 bg-gradient-to-r from-purple-700 to-violet-600 
                                     dark:from-purple-600 dark:to-violet-500 
                                     text-white rounded-lg font-semibold 
                                     hover:from-purple-800 hover:to-violet-700
                                     dark:hover:from-purple-700 dark:hover:to-violet-600 
                                     transition-all duration-300 shadow-lg hover:shadow-xl
                                     dark:shadow-purple-500/10"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {type === "signup" ? "Sign Up" : "Sign In"}
                        </motion.button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-slate-600 dark:text-gray-400">
                            {type === "signup" 
                                ? "Already have an account? " 
                                : "Don't have an account? "}
                            <Link 
                                to={type === "signup" ? "/login" : "/signup"}
                                className="text-purple-600 dark:text-purple-400 
                                         hover:text-purple-700 dark:hover:text-purple-300 
                                         font-medium transition-colors duration-300"
                            >
                                {type === "signup" ? "Sign In" : "Sign Up"}
                            </Link>
                        </p>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

function Input({label, placeholder, type, value, onChange}) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {label}
            </label>
            <input 
                type={type} 
                placeholder={placeholder} 
                value={value} 
                onChange={onChange}
                className="px-4 py-2.5 rounded-lg 
                         bg-white/80 dark:bg-gray-900/80 
                         border border-purple-200 dark:border-gray-800 
                         text-gray-900 dark:text-gray-100
                         placeholder-gray-500 dark:placeholder-gray-500
                         focus:outline-none focus:ring-2 
                         focus:ring-purple-500/50 dark:focus:ring-purple-400/50 
                         focus:border-transparent
                         transition-all duration-300"
            />
        </div>
    );
}

// Add these styles to your CSS/Tailwind config
const styles = `
@keyframes float-slow {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
}

@keyframes float-medium {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-15px); }
}

@keyframes float-fast {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
}

@keyframes blob {
    0% { transform: translate(0px, 0px) scale(1); }
    33% { transform: translate(30px, -50px) scale(1.1); }
    66% { transform: translate(-20px, 20px) scale(0.9); }
    100% { transform: translate(0px, 0px) scale(1); }
}

.animate-float-slow {
    animation: float-slow 6s ease-in-out infinite;
}

.animate-float-medium {
    animation: float-medium 5s ease-in-out infinite;
}

.animate-float-fast {
    animation: float-fast 4s ease-in-out infinite;
}

.animate-blob {
    animation: blob 7s infinite;
}

.animation-delay-2000 {
    animation-delay: 2s;
}

.animation-delay-4000 {
    animation-delay: 4s;
}
`;

export default Auth
