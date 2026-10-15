const express = require("express");
const menuController = require("../controllers/menuController");

const router = express.Router();

router.get("/", menuController.getAll);
router.get("/:id", menuController.getById);
router.post("/", menuController.create);
router.put("/:id", menuController.update);
router.delete("/:id", menuController.remove);

module.exports = router;
