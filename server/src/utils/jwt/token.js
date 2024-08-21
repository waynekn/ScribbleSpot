import jwt from "jsonwebtoken";

const generateToken = (user) => {
  const payload = {
    id: user._id,
  };
  return jwt.sign(payload, process.env.JWT_SECRET);
};
export default generateToken;
