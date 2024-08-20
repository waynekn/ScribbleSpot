import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
});

const postSchema = new mongoose.Schema({
  authorId: { type: String, required: true },
  blogs: [blogSchema],
});

postSchema.index({ authorId: 1, "blogs.title": 1 }, { unique: true });

export default mongoose.model("Post", postSchema);
