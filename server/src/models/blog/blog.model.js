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
  return blogs
    .find({ userName }, { _id: 0, title: 1, titleSlug: 1 })
    .sort({ datePosted: -1 });
};

/**
 * Fetches the blog content using the provided userame and title slug.
 *
 * @param {String} userName - The username of the user whose blog content is
 *                            being requested.
 * @param {String} titleSlug - The title of the blog being requested as a slug.
 * @returns {Promise<Object>} - A promise that resolves to a blog object if successful
 *                              or rejects wit an error if an error occurs.
 *
 * @throws {Error} - Throws an error if the fetch operation fails.
 */
export const fetchBlogContent = async (userName, titleSlug) => {
  const posts = await blogs.findOne(
    { userName, titleSlug },
    { title: 1, content: 1, userName: 1, datePosted: 1 }
  );
  return posts;
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
