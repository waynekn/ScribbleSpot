import jwt from "jsonwebtoken";

export const authenticateJWT = (req, res, next) => {
  const token = req.cookies.ssjwt;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).redirect("/authentication/sign-in");
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).redirect("/authentication/sign-in");
  }
};
