const express = require("express");
const router = express.Router();
const controllerStock = require("../controller/stock");

router.post("/", controllerStock.createStock);
router.get("/", controllerStock.checkStock);
router.get("/export", controllerStock.exportStock);
router.get("/allstock", controllerStock.getAllStock);

module.exports = router;
