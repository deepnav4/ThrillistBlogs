const express = require('express');
const { createBlog,allBlogs,getBlogById,deleteBlog,getAuthorBlogs,updateBlog } = require('../controllers/blogs');
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
router.use(authMiddleware);

router.get("/bulk",allBlogs)
router.post("/",createBlog)
router.get("/:id",getBlogById)
router.delete("/:id",deleteBlog)
router.get("/author/:id",getAuthorBlogs)
router.put("/:id/update",updateBlog)

module.exports = router;  // Make sure you're exporting the router