const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");
const app = express();
const userRoutes = require("./routes/user.routes");
const workspaceRoutes = require("./routes/workspace.routes");
const projectRoutes = require("./routes/project.routes");
const listRoutes = require("./routes/list.routes");
const authMiddleware = require("./middlewares/auth.middleware");
const cardRoutes = require("./routes/card.routes");


app.use(cors());
app.use(express.json());
app.use("/users", userRoutes);
app.use("/workspaces", workspaceRoutes);
app.use("/projects", projectRoutes);
app.use("/lists", listRoutes);
app.use("/cards", cardRoutes);

// temorary code foe authMiddleware
app.get("/protected", authMiddleware, (req, res) => {
  res.json({
    message: "You are authorized",
    user: req.user,
  });
});

module.exports = app;
