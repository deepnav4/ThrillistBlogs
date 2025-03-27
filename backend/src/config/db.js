const mongoose = require("mongoose");
require('dotenv').config();

exports.connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
    } catch (error) {
        console.log("Error connecting to MongoDB", error);
    }
}   