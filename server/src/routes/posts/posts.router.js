import express from "express";
import { authenticateJWT } from "../../middleware/auth/jwt.auth.js";
import {
  postBlog,
  getBlogTitles,
  getBlogContent,
} from "../../controllers/posts/blog.controller.js";
export const postsRouter = express.Router();

postsRouter.post("/blog", authenticateJWT, postBlog);
postsRouter.get("/titles", authenticateJWT, getBlogTitles);
postsRouter.post("/content", authenticateJWT, getBlogContent);
