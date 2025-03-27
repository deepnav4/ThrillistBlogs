import React from 'react'
import Auth from '../components/Auth'
import AppBar from '../components/AppBar'
import { useTheme } from '../context/ThemeContext'

const Signup = () => {
  const { theme } = useTheme();

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <AppBar theme={theme} />
        <Auth type="signup" />
      </div>
    </div>
  )
}

export default Signup
