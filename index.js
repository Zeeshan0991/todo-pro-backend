require("dotenv").config(); // Load env first

const app = require("./src/app");
const sequelize = require("./src/config/db");

// Load models & relations
require("./src/entities");

const PORT = process.env.PORT || 8080;

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ PostgreSQL connected");

    // ✅ safer for production
    await sequelize.sync();
    console.log("✅ Database synced");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (err) {
    console.error("❌ Startup error:", err);
  }
})();