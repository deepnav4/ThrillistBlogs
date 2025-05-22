import express from 'express';
import { createBlog, allBlogs, getBlogById, deleteBlog, getAuthorBlogs, updateBlog } from '../controllers/blogs.js';
const router = express.Router();
import authMiddleware from "../middlewares/authMiddleware.js";
router.use(authMiddleware);

router.get("/bulk", allBlogs);
router.post("/", createBlog);
router.get("/:id", getBlogById);
router.delete("/:id", deleteBlog);
router.get("/author/:id", getAuthorBlogs);
router.put("/:id/update", updateBlog);

export default router;