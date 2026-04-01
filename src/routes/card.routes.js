const router = require("express").Router();
const controller = require("../controllers/card.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/", authMiddleware, controller.createCard);
router.get("/", authMiddleware, controller.getCards);

module.exports = router;