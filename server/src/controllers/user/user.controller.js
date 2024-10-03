import { uploadImage, getSignedImageUrl } from "../../services/aws/s3.js";
import {
  fetchProfileByUserName,
  updateUserName,
  fetchUserSuggestions,
} from "../../models/user/user.model.js";
import { getCache, updateCache } from "../../models/cache/url-cache.model.js";

/**
 * Handles the request to get a user profile.
 * This function retrieves the profile of a user based on the username provided.
 * For OAuth users authenticated via Google, the username is initially retrieved
 * from the authenticated user object in the request. Subsequent requests should
 * include the username in the request body.
 *
 * @param {Object} req - The request object
 * @param {Object} req.user - The authenticated user object
 * @param {String} req.user.id - The ID of the authenticated user.
 * @param {String} req.user.userName - The username for which to fetch the profile.
 * @param {Object} req.body - The request body
 * @param {String} req.body.userName - The username of the request profile
 * @param {*} res
 * @returns {Object} res.status(200) - If profile is succesfully retreived.
 * @returns {Object} res.status(404) - If the profile is not found.
 * @returns {Object} res.status(500) - If an error occurred.
 */
export const getUserProfile = async (req, res) => {
  try {
    const userName = req.body?.userName || req.user?.userName;
    const profile = await fetchProfileByUserName(userName);
    if (profile) {
      return res.status(200).json({ profile });
    } else {
      return res.status(404).json({ error: "Profile not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

/**
 * Handles requests to update a users profile
 *
 * If a file is uploaded, it is used to update the user's profile picture.
 * If a new username is provided, it is updated accordingly.
 *
 * @param {Object} req - The request object
 * @param {Object} req.user - The authenticated user object
 * @param {String} req.user.id - The ID of the authenticated user.
 * @param {String} req.user.userName - The username of the authenticated user.
 * @param {Object} req.body - The request body.
 * @param {String} req.body.userName - The username the user intends to switch to.
 * @param {Object} req.file - The request file object, added by multer.
 * @param {String} req.file.buffer - The buffer of the uploaded image file.
 * @param {String} req.file.mimetype - The MIME type of the uploaded image file.
 * @param {*} res
 * @returns res.status(200) - for a successfull update.
 * @returns res.status(500) - if an error occurred during the update process.
 */
export const updateProfile = async (req, res) => {
  try {
    if (req.file) {
      await uploadImage(req.user.id, req.file.buffer, req.file.mimetype);
    }
    const existingUserName = await fetchProfileByUserName(req.body.userName);

    if (existingUserName) {
      return res.status(400).json({ error: "Username is already registered" });
    }

    if (req.body.userName) {
      await updateUserName(req.user.id, req.body.userName);
    }
    return res.status(200);
  } catch (error) {
    return res.status(500).json({
      error: "Could complete request. Please try again in a while",
    });
  }
};

/**
 * Handles requests to get a signed URL for displaying a user's profile picture.
 * This function fetches a signed URL from S3 that can be used as the `src` attribute
 * of an `<img>` tag to display the profile picture.
 *
 * The function first checks a cache to see if a valid signed URL is available.
 * If not, it retrieves a new signed URL from S3, updates the cache, and then returns the URL.
 *
 * @param {Object} req - The request object.
 * @param {Object} req.user - The authenticated user object.
 * @param {String} req.user.id - The ID of the authenticated user.
 * @param {String} req.user.userName - The username of the authenticated user.
 * @param {Object} req.body - The request body.
 * @param {String} req.body.userName - The username of the user whose profile picture is being fetched.
 * @param {String} req.body.imageKey - The key of the user's profile picture in the AWS S3 bucket.
 * @param {*} res - The response object.
 * @returns {Object} res.status(200) - If the signed URL was retrieved successfully.
 * @returns {Object} res.status(500) - If an error occurred.
 */

export const getImageUrl = async (req, res) => {
  const imageKey = req.body.imageKey;
  const userName = req.body.userName;

  try {
    const cache = await getCache(userName);

    if (cache && cache.imageKey === imageKey && cache.expiresAt > Date.now()) {
      const imageUrl = cache.imageUrl;
      return res.status(200).json({ imageUrl });
    }

    const imageUrl = await getSignedImageUrl(imageKey);

    const newCache = {
      userName,
      imageKey,
      imageUrl,
      expiresAt: new Date(Date.now() + 3500 * 1000),
    };
    await updateCache(newCache);
    return res.status(200).json({ imageUrl });
  } catch (error) {
    if (error.code) {
      // S3 errors have a code property
      return res.status(500).json({ error: "Could not get image" });
    } else if (error.name === "MongoError") {
      return res.status(500).json({ error: `A database error occured` });
    } else {
      return res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};

/**
 * Handles searching for users based on the provided username.
 *
 * @param {Object} req - The request object.
 * @param {Object} req.user - The authenticated user object.
 * @param {String} req.user.id - The ID of the authenticated user.
 * @param {String} req.user.userName - The username of the authenticated user.
 * @param {Object} req.body - The request body.
 * @param {String} req.body.userName - The username of the user whose profile is being searched.
 * @param {Object} res - The response object.
 * @returns {Array<String>} res.status(200) An array of suggested users.
 * @returns {Object} res.status(404) A JSON object with an error message if no matches are found.
 * @returns {Object} res.status(500) A JSON object with an error message if an error occurs during processing.
 */
export const getUserSuggestions = async (req, res) => {
  const userName = req.body.userName;
  try {
    const fetchedUsers = await fetchUserSuggestions(userName);

    if (!fetchedUsers) {
      return res.status(404).json({ error: `Could not find user ${userName}` });
    }

    const suggestedUsers = fetchedUsers.map(
      (suggestion) => suggestion.userName
    );

    return res.status(200).json({ suggestedUsers });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while searching for users" });
  }
};
