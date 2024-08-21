import express from "express";
import { authenticateJWT } from "../../middleware/auth/jwt.auth.js";
import { postBlog } from "../../controllers/posts/blog.controller.js";
export const postsRouter = express.Router();

postsRouter.post("/blog", authenticateJWT, postBlog);
