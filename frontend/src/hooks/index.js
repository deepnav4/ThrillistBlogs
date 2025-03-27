import axios from "axios";
import { useEffect, useState } from "react";

const API_URL = "http://localhost:3001";

export const useBlogs = () => {
    const [loading,setLoading] = useState(false);
    const [blogs,setBlogs] = useState([]);

    useEffect(() => {
        axios.get(`${API_URL}/api/v1/blog/bulk`,{
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
        .then((res) => {
            setBlogs(res.data.blogs);
            setLoading(false);
        })
        .catch((err) => {
            setLoading(false);
            console.log(err);
        })
    },[])
    return {blogs,loading};
}

export const useBlog = (id) => {
    const [loading,setLoading] = useState(false);
    const [blog,setBlog] = useState(null);

    useEffect(() => {
        setLoading(true);
        axios.get(`${API_URL}/api/v1/blog/${id}`, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
        .then((res) => {
            setBlog(res.data.blog);
            setLoading(false);
        })
        .catch((err) => {
            setLoading(false);
            console.log(err);
        })
    },[id])
    return {blog,loading};
}       
