import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  userName: { type: String, required: true },
  profilePicture: { type: String, required: true },
  dateJoined: { type: Date, required: true },
});

export default mongoose.model("User", userSchema);
