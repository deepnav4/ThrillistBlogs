import User from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const signup = async (req,res) => {
    const {name,email,password} = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({message:
            "All fields are required"
        });
    }
    const existingUser = await User.findOne({email});
    if (existingUser) {
        return res.status(400).json({
            message:"User already exists, Please Login !"
        });
    }

    // Hash password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    User.create({
        name,
        email,
        password: hashedPassword
    }).then((user) => {
        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(201).json({
            message: "User created successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            },
            token
        });
    }).catch((err) => {
        res.status(500).json({message:"Internal Server Error",
            error:err.message
        });
    })
}

export const login = async (req,res) => {
    const {email,password} = req.body;
    if (!email || !password) {
        return res.status(400).json({
            message:"All fields are required"
        });
    }
    const user = await User.findOne({email});
    if (!user) {
        return res.status(400).json({
            message:"User not found, Please Signup !"
        });
    }

    // Compare passwords using bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({
            message:"Invalid password"
        });
    }

    // Generate JWT token
    const token = jwt.sign(
        { userId: user._id },
        JWT_SECRET,
        { expiresIn: '24h' }
    );

    res.status(200).json({
        message: "Login successful",
        user: {
            id: user._id,
            name: user.name,
            email: user.email
        },
        token
    });
}

export const getUser = async (req, res) => {
    try {
        // Get JWT token from Authorization header
        const authHeader = req.headers.authorization || localStorage.getItem('token');
        if (!authHeader) {
            return res.status(401).json({
                message: "Unauthorized - No token provided"
            });
        }

        // Extract and verify token
        const token = authHeader;
        let decoded;
        try {
            decoded = jwt.verify(token, JWT_SECRET);
        } catch (err) {
            return res.status(401).json({
                message: "Unauthorized - Invalid token"
            });
        }

        // Find user and populate blogs
        const user = await User.findById(decoded.userId)
            .populate({
                path: 'blogs',
                select: 'title content createdAt',
                options: { sort: { 'createdAt': -1 } }
            });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Return user info with blogs
        res.status(200).json({
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                blogs: user.blogs,
                createdAt: user.createdAt
            }
        });

    } catch (error) {
        res.status(500).json({
            message: "Error fetching user data",
            error: error.message
        });
    }
}


