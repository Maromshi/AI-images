import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {
  // Check token existing
  const token = req.headers.authorization?.split(" ")[1];
  //   console.log("my token", token);
  if (!token) {
    return res.status(401).json({ message: "Unauthorized - No Token" });
  }

  try {
    // Jwt standart testing
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    // console.log(req.user);
    next();
  } catch (err) {
    res.status(401).json({ message: "Unauthorized - Invalid Token" });
  }
};
