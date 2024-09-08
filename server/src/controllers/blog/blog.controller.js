import {
  checkExistingTitle,
  uploadBlog,
  fetchBlogContent,
  fetchBlogTitles,
  deleteBlog,
} from "../../models/blog/blog.model.js";

export const postBlog = async (req, res) => {
  try {
    const authorId = req.user.id;
    const title = req.body.title;
    const titleSlug = title.replace(/\s+/g, "-").toLowerCase();
    const content = req.body.blogContent;
    const userName = req.user.userName;

    const existingTitle = await checkExistingTitle(authorId, title);

    if (existingTitle) {
      return res.status(400).json({ error: "Can't have duplicate titles" });
    }

    await uploadBlog(authorId, userName, title, titleSlug, content);
    res.status(201).json({ message: "Post successfuly uploaded" });
  } catch (error) {
    if (error.name && error.name === "MongoError") {
      return res.status(500).json({ error: "A database error occurred" });
    }
    return res.status(500).json({ error: "An unknown error occurred" });
  }
};

export const getBlogTitles = async (req, res) => {
  const userName = req.body.userName;
  try {
    const titles = await fetchBlogTitles(userName);
    return res.status(200).json({ titles });
  } catch (error) {
    return res.status(500).json({ error: "Couldn't get titles" });
  }
};

export const getBlogContent = async (req, res) => {
  try {
    const titleSlug = req.body.titleSlug;
    const userName = req.body.userName;
    const blog = await fetchBlogContent(userName, titleSlug);

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
