require("dotenv").config(); // 🔥 Load env FIRST

const app = require("./src/app");
const sequelize = require("./src/config/db");

// 🔥 LOAD ALL ENTITIES & RELATIONS
require("./src/entities");

const PORT = process.env.PORT || 8080;

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ PostgreSQL connected");

    await sequelize.sync({ alter: true });
    console.log("🔥 Clean DB synced");

    app.listen(PORT, () =>
      console.log(`🚀 Server running on port ${PORT}`)
    );
  } catch (err) {
    console.error("❌ Startup error:", err);
  }
})();
