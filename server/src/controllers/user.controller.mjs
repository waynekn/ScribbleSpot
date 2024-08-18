import { uploadImage, getSignedImageUrl } from "../services/aws/s3.mjs";
import {
  findUserProfile,
  updateDisplayName,
} from "../models/user/user.model.mjs";
import { getCache, updateCache } from "../models/cache/url-cache.model.mjs";

export const fetchUserProfile = async (req, res) => {
  try {
    const profile = await findUserProfile(req.user.id);
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
  const userId = req.user.id;

  try {
    const cache = await getCache(userId);

    if (cache && cache.imageKey === imageKey && cache.expiresAt > Date.now()) {
      const imageUrl = cache.imageUrl;
      return res.status(200).json({ imageUrl });
    }

    const imageUrl = await getSignedImageUrl(imageKey);

    const newCache = {
      userId: userId,
      imageKey: imageKey,
      imageUrl: imageUrl,
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
