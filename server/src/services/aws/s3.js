import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import dotenv from "dotenv";
import sharp from "sharp";
dotenv.config();

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const client = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },
  region: bucketRegion,
});

export const getSignedImageUrl = (key) => {
  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: key,
  });
  return getSignedUrl(client, command, { expiresIn: 3600 });
};

export const uploadImage = async (key, buffer, mimeType) => {
  buffer = await sharp(buffer)
    .resize({ height: 1920, width: 1080, fit: "contain" })
    .toBuffer();

  const params = {
    Bucket: bucketName,
    Key: key,
    Body: buffer,
    ContentType: mimeType,
  };

  const command = new PutObjectCommand(params);

  try {
    await client.send(command);
    const imageUrl = await getSignedImageUrl(key);
    return imageUrl;
  } catch (err) {
    console.error(err);
  }
};
