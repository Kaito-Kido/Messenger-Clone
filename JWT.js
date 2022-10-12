import jwt from "jsonwebtoken";

export const createToken = (user) => {
  const accessToken = jwt.sign(
    { username: user.username, id: user._id },
    process.env.ACCESS_TOKEN_SECRET
  );

  return accessToken;
};

export const createRefreshToken = (user) => {
  const refreshToken = jwt.sign(
    { username: user.username, id: user._id },
    process.env.REFRESH_TOKEN_SECRET
  );

  return refreshToken;
};

export const validateToken = (req, res, next) => {
  const accessToken = req.cookies["accessToken"];
  // console.log(req.cookies);
  if (!accessToken) {
    return res.status(403).json("Unauthorized");
  }
  try {
    const validToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    if (validToken) {
      req.authorized = true;
      return next();
    }
  } catch (err) {
    return res.status(401).json({ error: err });
  }
};
