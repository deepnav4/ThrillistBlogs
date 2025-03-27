const express = require("express");
const app = express();
const cors = require("cors");
const userRouter = require("./src/routes/userRoutes.js");
const blogRouter = require("./src/routes/blogRoutes.js");
const { connectDB } = require("./src/config/db.js");
const cookieParser = require('cookie-parser');
const path = require('path');

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

// API routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/blog", blogRouter);

// Serve static files from frontend/dist
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

// Update port to use environment variable
const PORT = process.env.PORT || 3001;

// Add error handling for database connection
connectDB().catch(err => {
    console.error('Failed to connect to database:', err);
    process.exit(1);
});

// Add error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

