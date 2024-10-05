import mongoose from "mongoose";

//oauth users dont have a password so the password
//key is not required
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  userName: { type: String, required: true, unique: true },
  profilePicture: { type: String, required: true },
  dateJoined: { type: Date, required: true },
  likedBlogs: [
    { type: mongoose.Schema.Types.ObjectId, ref: "blogs", required: true },
  ],
  dislikedBlogs: [
    { type: mongoose.Schema.Types.ObjectId, ref: "blogs", required: true },
  ],
  password: String,
});

export default mongoose.model("User", userSchema);
