const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../entities/user.entity");
const Workspace = require("../entities/workspace.entity");

// ==============================
// REGISTER USER + AUTO WORKSPACE
// ==============================
const registerUser = async (userData) => {
  const { name, email, password } = userData;

  const normalizedEmail = email.trim().toLowerCase();

  const existingUser = await User.findOne({
    where: { email: normalizedEmail },
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password.trim(), 10);

  const user = await User.create({
    name: name.trim(),
    email: normalizedEmail,
    password: hashedPassword,
  });

  await Workspace.create({
    name: `${name}'s Workspace`,
    userId: user.id,
  });

  return user;
};

// ==============================
// LOGIN USER
// ==============================
const loginUser = async ({ email, password }) => {
  const normalizedEmail = email.trim().toLowerCase();

  const user = await User.findOne({
    where: { email: normalizedEmail },
  });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await bcrypt.compare(
    password.trim(),
    user.password
  );

  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET not defined in .env");
  }

  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return token;
};

// ==============================
// GET ALL USERS
// ==============================
const getAllUsers = async () => {
  return await User.findAll();
};

module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
};