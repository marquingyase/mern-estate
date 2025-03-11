import jwt from "jsonwebtoken";

export const middleware = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token)
    return res.status(401).json({
      success: false,
      message: "Access denied, not authorized",
    });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.status(403).json({ message: "Invalid token" });
      return user;
    });
    req.user = decoded;
    next();
  } catch (error) {
    next(error);
  }
};
