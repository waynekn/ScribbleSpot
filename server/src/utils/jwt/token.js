import jwt from "jsonwebtoken";

const generateToken = (user) => {
  const payload = {
    id: user._id,
    userName: user.userName,
  };
  return jwt.sign(payload, process.env.JWT_SECRET);
};
export default generateToken;
