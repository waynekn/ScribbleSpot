import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  authorId: { type: String, required: true },
  userName: { type: String, required: true },
  title: { type: String, required: true },
  titleSlug: { type: String, required: true },
  content: { type: String, required: true },
  datePosted: { type: Date, required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }], // Array of user ObjectId,s who liked
  dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }], // Array of user ObjectId,s who disliked
});

blogSchema.index({ authorId: 1, title: 1 }, { unique: true });

export default mongoose.model("Blog", blogSchema);
