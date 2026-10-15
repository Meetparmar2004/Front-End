const express = require("express");
const orderController = require("../controllers/orderController");

const router = express.Router();

router.get("/", orderController.getAll);
router.post("/", orderController.create);

module.exports = router;
