import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true });

// Middleware to update user's blogs array when a blog is created
blogSchema.post('save', async function(doc) {
    try {
        const User = mongoose.model('User');
        await User.findByIdAndUpdate(
            doc.author,
            { $addToSet: { blogs: doc._id } },
            { new: true }
        );
    } catch (error) {
        console.error('Error updating user blogs array:', error);
    }
});

// Middleware to remove blog reference from user when blog is deleted
blogSchema.pre('remove', async function(next) {
    try {
        const User = mongoose.model('User');
        await User.findByIdAndUpdate(
            this.author,
            { $pull: { blogs: this._id } }
        );
        next();
    } catch (error) {
        next(error);
    }
});

export default mongoose.model("Blog", blogSchema);
