import blogs from "../../schemas/blog/blog.schema.js";

export const checkExistingTitle = async (authorId, title) => {
  return blogs.findOne({ authorId, title });
};
/**
 * Uploads a new blog post to the database.
 *
 * @param {String} authorId - The user id of the blog author.
 * @param {String} userName - The username of the author.
 * @param {String} title - The title of the blog.
 * @param {String} titleSlug - The title of the blog in a URL-friendly format,
 *                             e.g., 'my-blog-title'.
 * @param {String} content - The blog content in HTML format.
 * @param {Date} datePosted - The date when the blog was posted.
 * @returns {Promise<Object>} - A promise that resolves to the created blog object
 *                              containing the blog's details, or rejects with an
 *                              error if the upload fails.
 *
 * @throws {Error} - Throws an error if there is an issue with the upload process.
 */
export const uploadBlog = async (
  authorId,
  userName,
  title,
  titleSlug,
  content,
  datePosted
) => {
  return await blogs.create({
    authorId,
    userName,
    title,
    titleSlug,
    content,
    datePosted,
  });
};

/**
 * Fetches blog titles using the provided username.
 *
 * @param {String} userName - The username of the user whose blog titles are requested.
 * @returns {Promise<Object[]>} - A promise that resolves to an array of objects
 *                                sorted in descending order by the date posted
 *                                or rejects with an error if an error occurs.
 * @throws {Error} - Throws an error if the fetch operation fails.
 */
export const fetchBlogTitles = async (userName) => {
  const titles = await blogs
    .find({ userName }, { _id: 1, title: 1, titleSlug: 1 })
    .sort({ datePosted: -1 });
  return titles.map((title) => title.toObject());
};

/**
 * Fetches the blog content using the provided ID.
 *
 * @param {String} blogId - The Object ID of the blog to be fetched.
 * @returns {Promise<Object>} - A promise that resolves to a blog object if successful
 *                              or rejects wit an error if an error occurs.
 *
 * @throws {Error} - Throws an error if the fetch operation fails.
 */
export const fetchBlogContent = async (blogId) => {
  const blog = await blogs.findById(blogId, {
    __v: 0,
    titleSlug: 0,
    authorId: 0,
  });
  return blog.toObject();
};

/**
 * Fetches blog titles that match the input string pattern.
 *
 * This function searches for blog titles that match the provided title string,
 * returning a list of suggestions that include the title, its slug, and an identifier.
 *
 * @param {String} title - A string representing a possible title to match against.
 * @returns {Object[]} - An array of objects, each containing:
 *   - {String} title - The title of the blog.
 *   - {String} titleSlug - The slug of the blog title.
 *   - {String} id - The unique identifier for the blog post.
 * @throws {Error} - Throws an error if fetching the titles fails.
 */
export const fetchBlogSuggestions = async (title) => {
  const regex = new RegExp(title, "i");
  const fetchedTitles = await blogs
    .find({ title: { $regex: regex } }, { title: 1, titleSlug: 1 })
    .limit(5);
  return fetchedTitles.map((titleObj) => {
    title = titleObj.toObject();
    title = { ...title, id: title._id };
    delete title._id;
    return title;
  });
};

/**
 * Deletes a blog from the database using the provided authorId and title.
 *
 * @param {String} authorId - The id of the user who wants to delete their blog.
 * @param {String} title - The title of the blog which the user wants to delete.
 * @returns {Promise<Object>} - A promise that resolves to the deleted blog object
 *                              if successful or rejects with an error if an error occurs.
 *
 * @throws {Error} - Throws an error if the delete operation fails.
 */
export const deleteBlog = async (authorId, title) => {
  return blogs.findOneAndDelete({ authorId, title });
};

/**
 * Handles like requests to a blog. If the user had disliked a blog
 * their ID is removed from the dislikes. It adds a users ID to the likes array
 * if not present or removes it if present.
 *
 * @param {String} blogId - The Object id of the blog
 * @param {String} userId - The id of the user who wants to like a blog
 */
export const likeBlog = async (blogId, userId) => {
  const blog = await blogs.findById(blogId);

  if (!blog) {
    throw new Error("Blog not found");
  }

  let userHasLikedBlog = blog.likes.includes(userId);
  let userHasDislikedBlog = blog.dislikes.includes(userId);

  if (userHasDislikedBlog) {
    // If the user disliked the blog, remove them from dislikes and add to likes
    blog.dislikes = blog.dislikes.filter((id) => id.toString() !== userId);
    userHasDislikedBlog = false;
  }

  if (userHasLikedBlog) {
    // If the user already liked the blog, remove them from likes
    blog.likes = blog.likes.filter((id) => id.toString() !== userId);
  } else {
    // If the user hasn't liked it yet, add to likes
    blog.likes.push(userId);
  }

  await blog.save();

  userHasLikedBlog = !userHasLikedBlog;

  const blogReactionResult = {
    userHasLikedBlog,
    userHasDislikedBlog,
    likeCount: blog.likes.length - blog.dislikes.length,
  };

  return blogReactionResult;
};

/**
 * Handles dislikes requests to a blog. If the user had liked the blog
 * their ID is removed from the likes. It adds the users ID to the dislikes
 * array if not present or removes it if present.
 *
 * @param {String} blogId - The Object id of the blog
 * @param {String} userId - The id of the user who wants to dislike a blog
 */
export const disLikeBlog = async (blogId, userId) => {
  const blog = await blogs.findById(blogId);

  if (!blog) {
    throw new Error("Blog not found");
  }

  let userHasLikedBlog = blog.likes.includes(userId);
  let userHasDislikedBlog = blog.dislikes.includes(userId);

  if (userHasLikedBlog) {
    // If the user liked the blog, remove them from likes and add to dislikes
    blog.likes = blog.likes.filter((id) => id.toString() !== userId);
    userHasLikedBlog = false;
  }

  if (userHasDislikedBlog) {
    // If the user already disliked the blog, remove them from dislikes
    blog.dislikes = blog.dislikes.filter((id) => id.toString() !== userId);
  } else {
    // If the user hasn't disliked it yet, add to dislikes
    blog.dislikes.push(userId);
  }

  await blog.save();

  userHasDislikedBlog = !userHasDislikedBlog;

  const blogReactionResult = {
    userHasLikedBlog,
    userHasDislikedBlog,
    likeCount: blog.likes.length - blog.dislikes.length,
  };
  return blogReactionResult;
};
