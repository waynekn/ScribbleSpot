import express from "express";
import {
  postBlog,
  getBlogTitles,
  getBlogContent,
  getBlogSuggestions,
  handleDelete,
  handleBlogReaction,
} from "../controllers/blog/blog.controller.js";

const blogRouter = express.Router();

blogRouter.post("/", getBlogSuggestions);
blogRouter.post("/blog", postBlog);
blogRouter.post("/titles", getBlogTitles);
blogRouter.post("/content", getBlogContent);
blogRouter.post("/blog/delete", handleDelete);
blogRouter.post("/blog/react", handleBlogReaction);

export default blogRouter;
