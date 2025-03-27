const mongoose = require("mongoose");
const MONGO_URL = "mongodb+srv://workwithdeepnav:hNMSjEuDukkCeOza@cluster0.prvp2.mongodb.net/blogApp"


exports.connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URL);
    } catch (error) {
        console.log("Error connecting to MongoDB",error);
    }
}   