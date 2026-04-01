const express = require("express");
const router = express.Router();

const listController = require("../controllers/list.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/", authMiddleware, listController.createList);
router.get("/", authMiddleware, listController.getAllLists);
router.get("/:id", authMiddleware, listController.getListById);
router.put("/:id", authMiddleware, listController.updateList);
router.delete("/:id", authMiddleware, listController.deleteList);

module.exports = router;
