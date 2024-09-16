import {
  checkExistingTitle,
  uploadBlog,
  fetchBlogContent,
  fetchBlogTitles,
  deleteBlog,
} from "../../models/blog/blog.model.js";

/**
 * Handles requests to post a blog to the database.
 *
 * @param {Object} req - The request object.
 * @param {Object} req.user - The authenticated user object.
 * @param {String} req.user.id - The ID of the user.
 * @param {String} req.user.userName - The username of the user.
 * @param {Object} req.body - The request body.
 * @param {String} req.body.title - The title of the blog.
 * @param {String} req.body.blogContent - The content of the blog in HTML.
 * @param {Object} res - The response object.
 * @returns {Object} - The response object.
 * @returns {Object} res.status(201) - If the blog is successfully uploaded.
 * @returns {Object} res.status(400) - If the title already exists.
 * @returns {Object} res.status(500) - If there is a database error or unknown error.
 */
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
    return res.status(201).json({ message: "Post successfuly uploaded" });
  } catch (error) {
    if (error.name && error.name === "MongoError") {
      return res.status(500).json({ error: "A database error occurred" });
    }
    return res.status(500).json({ error: "An unknown error occurred" });
  }
};

/**
 * Fetches blog titles from the database based on the provided username.
 *
 * @param {Object} req - The request object.
 * @param {Object} req.user - The authenticated user object.
 * @param {String} req.user.id - The ID of the authenticated user.
 * @param {String} req.user.userName - The username of the authenticated user.
 * @param {Object} req.body - The request body.
 * @param {String} req.body.userName - The username of the blog author whose titles are to be fetched.
 * @param {Object} res - The response object.
 * @returns {Object} res.status(200) - If the blog titles were successfully fetched.
 * @returns {Object} res.status(404) - If no blog titles were found for the provided username.
 * @returns {Object} res.status(500) - If an error occurred.
 */
export const getBlogTitles = async (req, res) => {
  const userName = req.body.userName;
  try {
    const titles = await fetchBlogTitles(userName);
    if (!titles) {
      return res
        .status(404)
        .json({ error: `Could not get titles for ${userName}` });
    }
    return res.status(200).json({ titles });
  } catch (error) {
    return res.status(500).json({ error: "Couldn't get titles" });
  }
};

/**
 * Fetches a blog from the database based on the provided username and title slug
 *
 * @param {Object} req - The request object.
 * @param {Object} req.user - The authenticated user object.
 * @param {String} req.user.id - The ID of the authenticated user.
 * @param {String} req.user.userName - The username of the authenticated user.
 * @param {Object} req.body - The request body.
 * @param {String} req.body.userName - The username of the blog author whose blog is to be fetched.
 * @param {String} req.body.titleSlug - The title of the blog as a slug.
 * @param {Object} res - The response object.
 * @returns {Object} res.status(200) - If the blog is successfully fetched.
 * @returns {Object} res.status(400) - If the blog is not found.
 * @returns {Object} res.status(500) - If an error occurred.
 */
export const getBlogContent = async (req, res) => {
  try {
    const titleSlug = req.body.titleSlug;
    const userName = req.body.userName;
    const blog = await fetchBlogContent(userName, titleSlug);

    if (!blog) {
      return res.status(400).json({ error: "Blog not found" });
    }

    return res.status(200).json({ blog });
  } catch (error) {
    return res.status(500).json({ error: "A server errror occured" });
  }
};

/**
 * Deletes a blog from the database based on the author id and title
 *
 * @param {Object} req - The request object.
 * @param {Object} req.user - The authenticated user object.
 * @param {String} req.user.id - The ID of the authenticated user.
 * @param {String} req.user.userName - The username of the authenticated user.
 * @param {Object} req.body - The request body.
 * @param {String} req.body.title - The title of the blog to be deleted.
 * @param {Object} res - The response object.
 * @returns {Object} res.status(200) - If the blog is successfully deleted.
 * @returns {Object} res.status(400) - If the blog is not found.
 * @returns {Object} res.status(500) - If an error occurred.
 */
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
