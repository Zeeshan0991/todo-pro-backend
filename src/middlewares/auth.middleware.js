const jwt = require("jsonwebtoken");
const User = require("../entities/user.entity");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ FIX HERE
    const user = await User.findByPk(decoded.userId, {
      attributes: ["id", "email"],
    });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user; // important
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
