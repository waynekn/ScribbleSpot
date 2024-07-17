import { findUserProfile } from "../../models/user.model.mjs";

export const fetchUserProfile = async (req, res) => {
  try {
    const profile = await findUserProfile(req.user.displayName);
    res.status(200).json({ profile });
  } catch (error) {
    res.status(404).send("Profile not found");
  }
};
