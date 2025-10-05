import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./src/routes/userRoutes.js";
import blogRouter from "./src/routes/blogRoutes.js";
import { connectDB } from "./src/config/db.js";
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();

app.use(cors({
  origin: true,          // Reflect request origin automatically
  credentials: true,     // Allow cookies / authorization headers
}));

// Middleware
app.use(express.json());
app.use(cookieParser());



// Health check endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

// API routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/blog", blogRouter);

// Add error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

// Connect to database
connectDB().catch(err => {
    console.error('Failed to connect to database:', err);
    process.exit(1);
});

if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}
