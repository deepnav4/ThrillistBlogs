const Blog = require("../models/BlogModel")

exports.allBlogs = async(req,res) => {
    const blogs = await Blog.find();
    if(!blogs){
        return res.status(404).json({
            message: "No blogs found"
        })
    }
    const populatedBlogs = await Blog.find().populate('author');
    return res.status(200).json({blogs: populatedBlogs})
}

exports.createBlog = async(req,res) => {
    const author = req.user.userId;
    if(!author){
        return res.status(401).json({
            message: "Unauthorized"
        })
    }
    const {title, content} = req.body;
    if(!title || !content ) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }
    const blog = await Blog.create({title,content,author});
    return res.status(201).json({
        message: "Blog created successfully",
        blog: await Blog.findById(blog._id).populate('author')
    })
}

exports.getBlogById = async(req,res) => {
    const {id} = req.params;
    const blog = await Blog.findById(id).populate('author');
    if(!blog){
        return res.status(404).json({
            message: "Blog not found"
        })
    }
    return res.status(200).json({blog})
}


exports.deleteBlog = async(req,res) => {
    const {id} = req.params;
    const blog = await Blog.findByIdAndDelete(id);
    return res.status(200).json({message: "Blog deleted successfully"})
}

exports.getAuthorBlogs = async(req,res) => {
    const {id} = req.params;
    const blogs = await Blog.find({author: id});
    return res.status(200).json({blogs})
}

exports.updateBlog = async (req,res) => {
    const {id} = req.params;
    const {title, content} = req.body;
    const blog = await Blog.findById(id);
    if(!blog){
        return res.status(404).json({
            message: "Blog not found"
        })
    }
    if(blog.author.toString() !== req.user.userId){
        return res.status(401).json({
            message: "Unauthorized"
        })
    }
    blog.title = title;
    blog.content = content;
    await blog.save();
    return res.status(200).json({
        message: "Blog updated successfully",
        blog: await Blog.findById(id).populate('author')
    })
}