import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI).then(()=>{
            console.log("Connected to Backend !!");
        });
    } catch (error) {
        console.log("Error connecting to MongoDB", error);
    }
}   