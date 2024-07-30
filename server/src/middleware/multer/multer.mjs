import path from "node:path";
import multer from "multer";
import { uploadImage } from "../../services/aws/s3.mjs";

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

export const getImageBuffer = (req, res, next) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    try {
      if (req.file) {
        await uploadImage(req.user.id, req.file.buffer, req.file.mimetype);
      }

      req.body.displayName ? next() : res.status(200);
    } catch (error) {
      res.status(500);
    }
  });
};
