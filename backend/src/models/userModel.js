import mongoose from "mongoose";
// const crypto = require("crypto");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    blogs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog"
    }]
}, { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtual populate to get blogs
userSchema.virtual('userBlogs', {
    ref: 'Blog',
    localField: '_id',
    foreignField: 'author'
});

export default mongoose.model("User", userSchema);
