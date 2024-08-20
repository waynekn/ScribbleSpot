import express from "express";
import { authenticateJWT } from "../../middleware/auth/jwt.auth.mjs";
import { postBlog } from "../../controllers/posts/blog.controller.mjs";
export const postsRouter = express.Router();

postsRouter.post("/blog", authenticateJWT, postBlog);
