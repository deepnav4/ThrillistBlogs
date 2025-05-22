import './App.css'
import React from 'react'
import "./index.css"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import Blogs from './pages/Blogs'
import Blog from './pages/Blog'
import Publish from './pages/Publish'
import Profile from './pages/Profile'
import { ThemeProvider } from './context/ThemeContext'
import About from './pages/About'
import { AuthProvider } from './context/AuthContext'
import EditBlog from './pages/EditBlog'

function App() {  
  return (
    <AuthProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blog/:id" element={<Blog />} />  
            <Route path="/publish" element={<Publish />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog/:id/edit" element={<EditBlog />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  )
}

export default App;
