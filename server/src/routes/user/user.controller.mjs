import { findUserProfile } from "../../models/user.model.mjs";

export const fetchUserProfile = async (req, res) => {
  try {
    const profile = await findUserProfile(req.user.displayName);
    res.status(200).json({ profile });
  } catch (error) {
    console.error(chalk.red("Error fetching user profile: "), error);
    res.status(404).send("Profile not found");
  }
};
