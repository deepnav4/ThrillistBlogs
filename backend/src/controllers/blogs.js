import Blog from "../models/BlogModel.js"

export const allBlogs = async(req,res) => {
    try {
        const blogs = await Blog.find().populate('author', 'name email');
        res.status(200).json({ blogs });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const createBlog = async(req,res) => {
    try {
        const { title, content } = req.body;
        const blog = new Blog({
            title,
            content,
            author: req.user.userId
        });
        const savedBlog = await blog.save();
        res.status(201).json({ blog: savedBlog });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const getBlogById = async(req,res) => {
    try {
        const blog = await Blog.findById(req.params.id).populate('author', 'name email');
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.status(200).json({ blog });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteBlog = async(req,res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        
        // Check if the user is the author
        if (blog.author.toString() !== req.user.userId.toString()) {
            return res.status(403).json({ message: 'Not authorized to delete this blog' });
        }

        await blog.deleteOne();
        res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getAuthorBlogs = async(req,res) => {
    try {
        const blogs = await Blog.find({ author: req.params.id }).populate('author', 'name email');
        res.status(200).json({ blogs });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export const updateBlog = async (req,res) => {
    try {
        const { title, content } = req.body;
        const blog = await Blog.findById(req.params.id).populate('author');
        
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        // Check if the user is the author and both values exist
        if (!blog.author || !req.user || blog.author._id.toString() !== req.user.userId.toString()) {
            return res.status(403).json({ message: 'Not authorized to update this blog' });
        }

        blog.title = title || blog.title;
        blog.content = content || blog.content;
        
        const updatedBlog = await blog.save();
        res.status(200).json({ blog: updatedBlog });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}