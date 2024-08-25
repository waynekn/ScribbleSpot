import express from "express";
import { authenticateJWT } from "../../middleware/auth/jwt.auth.js";
import {
  postBlog,
  getBlogTitles,
  getBlogContent,
} from "../../controllers/blog/blog.controller.js";
export const blogRouter = express.Router();

blogRouter.post("/blog", authenticateJWT, postBlog);
blogRouter.get("/titles", authenticateJWT, getBlogTitles);
blogRouter.post("/content", authenticateJWT, getBlogContent);
