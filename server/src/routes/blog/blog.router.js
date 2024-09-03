import express from "express";
import {
  postBlog,
  getBlogTitles,
  getBlogContent,
  handleDelete,
} from "../../controllers/blog/blog.controller.js";
export const blogRouter = express.Router();

blogRouter.post("/blog", postBlog);
blogRouter.get("/titles", getBlogTitles);
blogRouter.post("/content", getBlogContent);
blogRouter.post("/blog/delete", handleDelete);
