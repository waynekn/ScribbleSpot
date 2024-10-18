import mongoose from "mongoose";
import {
  checkExistingTitle,
  uploadBlog,
  fetchBlogContent,
  fetchBlogSuggestions,
  fetchBlogTitles,
  deleteBlog,
  likeBlog,
  disLikeBlog,
} from "../../models/blog/blog.model.js";

/**
 * Handles requests to post a blog to the database.
 *
 * @param {Object} req - The request object.
 * @param {Object} req.user - The authenticated user object.
 * @param {String} req.user.id - The ID of the user.
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

    const existingTitle = await checkExistingTitle(authorId, title);

    if (existingTitle) {
      return res.status(400).json({ error: "Can't have duplicate titles" });
    }

    const datePosted = new Date();
    await uploadBlog(authorId, title, titleSlug, content, datePosted);
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
    const fetchedTitles = await fetchBlogTitles(userName);
    if (!fetchedTitles) {
      return res
        .status(404)
        .json({ error: `Could not get titles for ${userName}` });
    }

    const titles = fetchedTitles.map(({ _id, ...rest }) => ({
      id: _id,
      ...rest,
    }));

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
 * @param {String} req.body.blogId - The ID of the requested blog content.
 * @param {Object} res - The response object.
 * @returns {Object} res.status(200) - If the blog is successfully fetched.
 * @returns {Object} res.status(400) - If the blog is not found.
 * @returns {Object} res.status(500) - If an error occurred.
 */
export const getBlogContent = async (req, res) => {
  try {
    const blogId = req.body.blogId;
    let userId = req.user.id;
    const blog = await fetchBlogContent(blogId);

    userId = new mongoose.Types.ObjectId(userId);

    if (!blog) {
      return res.status(400).json({ error: "Blog not found" });
    }
    const userHasLikedBlog = blog.likes.some((likeId) => likeId.equals(userId));
    const userHasDislikedBlog = blog.dislikes.some((dislikeId) =>
      dislikeId.equals(userId)
    );

    const id = blog._id;

    const responseBlog = {
      ...blog,
      id,
      userHasLikedBlog,
      userHasDislikedBlog,
      likeCount: blog.likes.length - blog.dislikes.length,
    };

    delete responseBlog._id;
    delete responseBlog.likes;
    delete responseBlog.dislikes;

    return res.status(200).json({ blog: responseBlog });
  } catch (error) {
    return res.status(500).json({ error: "A server errror occured" });
  }
};

/**
 * Fetches blogs from the database whose title matches the regex pattern.
 *
 * @param {Object} req - The request object.
 * @param {Object} req.user - The authenticated user object.
 * @param {String} req.user.id - The ID of the authenticated user.
 * @param {String} req.user.userName - The username of the authenticated user.
 * @param {Object} req.body - The request body.
 * @param {String} req.body.title - The title of the blog being searched for (string).
 * @param {Object} res - The response object.
 * @returns {Object} res.status(200) - A JSON object containing the suggested blogs.
 *    @property {Array} suggestedBlogs - Array of blog objects matching the title.
 * @returns {Object} res.status(404) - A JSON object with an error message if no matches are found.
 *    @property {String} Error - Error message indicating no blogs found.
 * @returns {Object} res.status(500) - A JSON object with an error message if an error occurs during processing.
 *    @property {String} error - Error message detailing the processing error.
 */
export const getBlogSuggestions = async (req, res) => {
  const title = req.body.title;
  try {
    const suggestedBlogs = await fetchBlogSuggestions(title);

    if (!suggestedBlogs || suggestedBlogs.length === 0) {
      return res
        .status(404)
        .json({ Error: `Could not find blogs with the title "${title}"` });
    }

    return res.status(200).json({ suggestedBlogs });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "An error occurred while searching for the blog" });
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

/**
 * Handles a users reaction to a blog.
 *
 * @param {Object} req - The request object.
 * @param {Object} req.user - The authenticated user object.
 * @param {String} req.user.id - The ID of the authenticated user.
 * @param {String} req.user.userName - The username of the authenticated user.
 * @param {Object} req.body - The request body.
 * @param {Object} req.body.blogReaction - An object containing the blog id and type of reaction.
 * @param {String} req.body.blogReaction.blogId - The id of the blog.
 * @param {'like' | 'dislike'} req.body.blogReaction.reaction - The reaction to the blog, either 'like' or 'dislike'.
 * @param {Object} res - The response object.
 * @returns res.status(200) - If the users ID was succesfully added
 *                            or removed to the likes or dislikes of a blog.
 * @returns res.status(500) - If an error occurred
 */
export const handleBlogReaction = async (req, res) => {
  const userId = req.user.id;
  const blogReaction = req.body.blogReaction;
  const blogId = blogReaction.blogId;
  const reaction = blogReaction.reaction;

  try {
    const blogReactionResult =
      reaction === "like"
        ? await likeBlog(blogId, userId)
        : await disLikeBlog(blogId, userId);

    return res.status(200).json({ blogReactionResult });
  } catch (error) {
    return res.status(500).json({ error: "Could not complete request." });
  }
};
