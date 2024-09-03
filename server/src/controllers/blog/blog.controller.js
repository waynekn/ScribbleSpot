import {
  checkExistingTitle,
  uploadBlog,
  fetchBlogContent,
  fetchBlogTitles,
  deleteBlog,
} from "../../models/blog/blog.model.js";
import { fetchUserProfile } from "../../models/user/user.model.js";

export const postBlog = async (req, res) => {
  try {
    const authorId = req.user.id;
    const title = req.body.title;
    const titleSlug = title.replace(/\s+/g, "-");
    const content = req.body.blogContent;

    const existingTitle = await checkExistingTitle(authorId, title);

    if (existingTitle) {
      return res.status(400).json({ error: "Can't have duplicate titles" });
    }

    const { displayName } = await fetchUserProfile(authorId);
    await uploadBlog(authorId, displayName, title, titleSlug, content);
    res.status(201).json({ message: "Post successfuly uploaded" });
  } catch (error) {
    if (error.name && error.name === "MongoError") {
      return res.status(500).json({ error: "A database error occurred" });
    }
    return res.status(500).json({ error: "An unknown error occurred" });
  }
};

export const getBlogTitles = async (req, res) => {
  const authorId = req.user.id;
  try {
    const titles = await fetchBlogTitles(authorId);
    return res.status(200).json({ titles });
  } catch (error) {
    return res.status(500).json({ error: "Couldn't get titles" });
  }
};

export const getBlogContent = async (req, res) => {
  try {
    const titleSlug = req.body.titleSlug;
    const authorId = req.user.id;
    const blog = await fetchBlogContent(authorId, titleSlug);

    if (!blog) {
      return res.status(400).json({ error: "Blog not found" });
    }

    res.status(200).json({ blog });
  } catch (error) {
    res.status(500).json({ error: "A server errror occured" });
  }
};

export const handleDelete = async (req, res) => {
  try {
    const authorId = req.user.id;
    const title = req.body.title;
    const existingTitle = await checkExistingTitle(authorId, title);

    if (!existingTitle) {
      return res.status(400).json({ error: "Could not find blog" });
    }

    await deleteBlog(authorId, title);
    return res.status(200).json({ message: "Blog successfully deleted" });
  } catch (error) {
    return res.status(500).json({ error: "Could not delete blog" });
  }
};
