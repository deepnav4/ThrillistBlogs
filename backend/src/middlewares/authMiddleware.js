import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const authMiddleware = (req, res, next) => {
    // Get token from cookies
    const token = req.cookies.token || req.headers.authorization;
    
    if (!token) {
        return res.status(401).json({
            message: "Unauthorized - No token provided"
        });
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Add decoded user info to request object
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Unauthorized - Invalid token"
        });
    }
}

export default authMiddleware;