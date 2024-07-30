import { getSignedImageUrl } from "../services/aws/s3.mjs";
import { findUserProfile, updateDisplayName } from "../models/user.model.mjs";

export const fetchUserProfile = async (req, res) => {
  try {
    const profile = await findUserProfile(req.user.id);
    profile.profilePicture = await getSignedImageUrl(profile.profilePicture);
    res.status(200).json({ profile });
  } catch (error) {
    res.status(404).send("Profile not found");
  }
};

export const updateProfile = async (req, res) => {
  try {
    await updateDisplayName(req.user.id, req.body.displayName);
    res.status(200);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
