import { uploadImage, getSignedImageUrl } from "../services/aws/s3.mjs";
import {
  findUserProfile,
  updateDisplayName,
} from "../models/user/user.model.mjs";

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
