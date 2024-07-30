import path from "node:path";
import multer from "multer";
import { uploadImage, getSignedImageUrl } from "../services/aws/s3.mjs";
import { findUserProfile } from "../models/user.model.mjs";

const storage = new multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10000000, // 10MB
  },
  fileFilter: (req, file, cb) => {
    const fileTypesRegex = /\.(jpeg|jpg|png)$/i;
    const extName = path.extname(file.originalname);

    if (fileTypesRegex.test(extName)) {
      cb(null, true);
    } else {
      cb(
        new Error(`Error: Only these types are expected: .jpeg, .jpg, .png`),
        false
      );
    }
  },
}).single("profile-picture");

export const fetchUserProfile = async (req, res) => {
  try {
    const profile = await findUserProfile(req.user.id);
    profile.profilePicture = await getSignedImageUrl(profile.profilePicture);
    res.status(200).json({ profile });
  } catch (error) {
    res.status(404).send("Profile not found");
  }
};

export const updateProfile = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    await uploadImage(req.user.id, req.file.buffer, req.file.mimetype);

    res.status(200).json({ message: "File uploaded successfully" });
  });
};
