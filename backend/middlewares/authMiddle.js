import jwt from "jsonwebtoken";

export const authMiddle = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ success: false, message: "Please be verified" });
    }

    const decode = jwt.verify(token, process.env.JWT_SECREAT);
console.log(decode)
    if (!decode) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    req.userId = decode.id;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: error.message });
  }
};

