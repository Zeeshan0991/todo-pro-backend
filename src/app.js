const express = require("express");
const cors = require("cors");

const app = express();

// ✅ CORS FIX (IMPORTANT for Vercel frontend)
app.use(cors({
  origin: "*", // later you can replace with your Vercel URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(express.json());

// ✅ Routes
const userRoutes = require("./routes/user.routes");
const workspaceRoutes = require("./routes/workspace.routes");
const projectRoutes = require("./routes/project.routes");
const listRoutes = require("./routes/list.routes");
const cardRoutes = require("./routes/card.routes");

app.use("/users", userRoutes);
app.use("/workspaces", workspaceRoutes);
app.use("/projects", projectRoutes);
app.use("/lists", listRoutes);
app.use("/cards", cardRoutes);

// ✅ Auth Middleware Test Route
const authMiddleware = require("./middlewares/auth.middleware");

app.get("/protected", authMiddleware, (req, res) => {
  res.json({
    message: "You are authorized",
    user: req.user,
  });
});

// ✅ Root route (VERY IMPORTANT for Render test)
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

module.exports = app;