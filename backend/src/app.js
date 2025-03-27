const express = require("express");
const app = express();
const cors = require("cors");
const userRouter = require("./routes/userRoutes.js");
const blogRouter = require("./routes/blogRoutes.js");
const { connectDB } = require("./config/db.js");
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
app.use(express.static(path.join(__dirname, '../../frontend/dist')));

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
});

connectDB();

app.listen(3001, () => {
    console.log('Server running on port 3001');
});

