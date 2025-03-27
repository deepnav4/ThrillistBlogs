const jwt = require("jsonwebtoken");
const JWT_SECRET = "secret";

const authMiddleware = (req, res, next) => {
    // Get token from cookies
    const token = req.cookies.token || req.headers.authorization;
    
    if (!token) {
        return res.status(401).json({
            message: "Unauthorized - No token provided"
        });
    }
    
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        // Add decoded user info to request object
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Unauthorized - Invalid token"
        });
    }
}

module.exports = authMiddleware;