import mongoose from "mongoose";

const BlogReactionSchema = mongoose.Schema({
  title: { type: String, required: true },
  titleSlug: { type: String, required: true },
  blogId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "blogs",
    required: true,
  },
});

//oauth users dont have a password so the password
//key is not required
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  userName: { type: String, required: true, unique: true },
  profilePicture: { type: String, required: true },
  dateJoined: { type: Date, required: true },
  likedBlogs: [BlogReactionSchema],
  dislikedBlogs: [BlogReactionSchema],
  password: String,
});

export default mongoose.model("User", userSchema);
