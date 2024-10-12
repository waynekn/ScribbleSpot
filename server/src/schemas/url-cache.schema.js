import mongoose from "mongoose";

const cacheSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  imageKey: { type: String, required: true },
  imageUrl: { type: String, required: true },
  expiresAt: { type: Date, required: true },
});

cacheSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 3600 });

const cache = mongoose.model("Cache", cacheSchema);
export default cache;
