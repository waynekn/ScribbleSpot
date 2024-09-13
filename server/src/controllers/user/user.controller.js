import { uploadImage, getSignedImageUrl } from "../../services/aws/s3.js";
import {
  fetchProfileByUserName,
  updateDisplayName,
} from "../../models/user/user.model.js";
import { getCache, updateCache } from "../../models/cache/url-cache.model.js";

export const getUserProfile = async (req, res) => {
  try {
    const userName = req.body?.userName || req.user?.userName;
    const profile = await fetchProfileByUserName(userName);
    if (profile) {
      res.status(200).json({ profile });
    } else {
      res.status(404).json({ error: "Profile not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    if (req.file) {
      await uploadImage(req.user.id, req.file.buffer, req.file.mimetype);
    }
    if (req.body.displayName) {
      await updateDisplayName(req.user.id, req.body.displayName);
    }
    res.status(200);
  } catch (error) {
    res.status(500).json({
      error: "Could complete request. Please try again in a while",
    });
  }
};

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
