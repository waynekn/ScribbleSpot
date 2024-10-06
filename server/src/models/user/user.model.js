import users from "../../schemas/user/user.schema.js";

/**
 * Authenticates a user by their email address.
 * This function supports authentication via Google OAuth and also allows
 * users to authenticate using their email. If the user does not wish to
 * use their Google account, they can provide their email instead.
 *
 * @param {string} email - The email address of the user attempting to authenticate.
 * @returns {Promise<Object>} - A promise that resolves to the user object if authentication is successful.
 * @throws {Error} - Throws an error if the authentication fails due to invalid email or other issues.
 */
export const fetchProfileByEmail = (email) =>
  users.findOne({ email }, { dislikedBlogs: 0 });

/**
 * Fetches a user by their username.
 * This function can also be used for authenticating users who sign in with their username.
 *
 * @param {string} userName - The username of the user whose profile is being requested.
 * @returns {Promise<Object>} - A promise that resolves to the user object if found.
 * @throws {Error} - Throws an error if an error occurred during fetching.
 */
export const fetchProfileByUserName = (userName) =>
  users.findOne({ userName: userName }, { __v: 0, dislikedBlogs: 0 });

export const updateUserName = async (id, userName) => {
  return users.findByIdAndUpdate({ _id: id }, { $set: { userName: userName } });
};

/**
 * Adds a new user to the database.
 *
 * @param {Object} user - The user object containing user details (e.g, userName, email).
 * @returns {Promise<Object>} - A promise that resolves to the created user object if successful.
 * @throws {Error} - Throws an error if an error occurs during the user creation process.
 */
export const createUser = (user) => {
  const newUser = {
    ...user,
    dateJoined: new Date(),
    profilePicture: "DEFAULT_PROFILE_PICTURE", //key of default profile picture on s3 bucket
  };
  return users.create(newUser);
};

/**
 * Gets users whose username matches the userName parameter.
 *
 * @param {String} userName - A string pattern of possible usernames.
 * @returns {Promise<Object[]>}  Returns a promise that reovles to an array of user objects.
 * @throws {Error}  If an error occurs while getting suggestions.
 */
export const fetchUserSuggestions = (userName) => {
  const regex = new RegExp(userName, "i");
  return users
    .find({ userName: { $regex: regex } }, { _id: 0, userName: 1 })
    .limit(5);
};

/**
 * Updates a user's liked and disliked blogs.
 *
 * Removes any object from the user's dislikedBlogs array whose blogId matches the passed blogId.
 *
 * If the blogId is not present in the likedBlogs array, it is added;
 * if it is present, it is removed.
 *
 * @param {String} blogId - The ObjectId of the blog that the user has liked.
 * @param {String} userId - The ObjectId of the user who has liked the blog.
 * @param {String} title - The title of the liked blog.
 * @param {String} titleSlug - The title slug of the liked blog.
 * @returns {Promise<void>} A promise that resolves when the user's preferences have been updated and saved.
 */
export const updateUsersLikedBlogs = async (
  blogId,
  userId,
  title,
  titleSlug
) => {
  const user = await users.findById(userId);

  user.dislikedBlogs = user.dislikedBlogs.filter(
    (dislikedBlog) => dislikedBlog.blogId.toString() !== blogId
  );

  const userHadLikedBlog = user.likedBlogs.find(
    (likedBlog) => likedBlog.blogId.toString() === blogId
  );

  if (userHadLikedBlog) {
    user.likedBlogs = user.likedBlogs.filter(
      (likedBlog) => likedBlog.blogId.toString() !== blogId
    );
  } else {
    user.likedBlogs.push({ title, titleSlug, blogId });
  }

  await user.save();
};

/**
 * Updates a user's disliked and liked blogs.
 *
 * Removes any object from the user's likedBlogs array whose blogId matches the passed blogId.
 *
 * If the blogId is not present in the dislikedBlogs array, it is added;
 * if it is present, it is removed.
 *
 * @param {String} blogId - The ObjectId of the blog that the user has disliked.
 * @param {String} userId - The ObjectId of the user who has disliked the blog.
 * @param {String} title - The title of the disliked blog.
 * @param {String} titleSlug - The title slug of the disliked blog.
 * @returns {Promise<void>} A promise that resolves when the user's preferences have been updated and saved.
 */
export const updateUsersDislikedBlogs = async (
  blogId,
  userId,
  title,
  titleSlug
) => {
  const user = await users.findById(userId);

  user.likedBlogs = user.likedBlogs.filter(
    (likedBlog) => likedBlog.blogId.toString() !== blogId
  );

  const userHadDisLikedBlog = user.dislikedBlogs.find(
    (dislikedBlog) => dislikedBlog.blogId.toString() === blogId
  );

  if (userHadDisLikedBlog) {
    user.dislikedBlogs = user.dislikedBlogs.filter(
      (dislikedBlog) => dislikedBlog.blogId.toString() !== blogId
    );
  } else {
    user.dislikedBlogs.push({ title, titleSlug, blogId });
  }

  await user.save();
};
