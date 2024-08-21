import mongoose from "mongoose";

const cacheSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  imageKey: { type: String, required: true },
  imageUrl: { type: String, required: true },
  expiresAt: { type: Date, required: true },
});

cacheSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 3600 });

export default mongoose.model("Cache", cacheSchema);
