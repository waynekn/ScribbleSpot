import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  authorId: { type: String, required: true, ref: "User" },
  title: { type: String, required: true },
  titleSlug: { type: String, required: true },
  content: { type: String, required: true },
  datePosted: { type: Date, required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Array of user ObjectId's who liked
  dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Array of user ObjectId's who disliked
});

blogSchema.index({ authorId: 1, title: 1 }, { unique: true });

const blogs = mongoose.model("Blog", blogSchema);
export default blogs;
