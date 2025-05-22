import axios from "axios";
import { useEffect, useState } from "react";
import { config } from '../config/config';

const API_URL = "http://localhost:3001/api/v1";

export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        axios.get(`${API_URL}/blog/bulk`, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
        .then((res) => {
            setBlogs(res.data.blogs || []);
            setLoading(false);
        })
        .catch((err) => {
            setLoading(false);
            console.log(err);
        })
    }, [])
    return {blogs, loading};
}

export const useBlog = (id) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        setLoading(true);
        axios.get(`${API_URL}/blog/${id}`, {
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
    }, [id])
    return {blog, loading};
}       
