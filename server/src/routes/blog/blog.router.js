import express from "express";
import {
  postBlog,
  getBlogTitles,
  getBlogContent,
  handleDelete,
  handleBlogReaction,
} from "../../controllers/blog/blog.controller.js";
export const blogRouter = express.Router();

blogRouter.post("/blog", postBlog);
blogRouter.post("/titles", getBlogTitles);
blogRouter.post("/content", getBlogContent);
blogRouter.post("/blog/delete", handleDelete);
blogRouter.post("/blog/react", handleBlogReaction);
