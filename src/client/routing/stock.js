const express = require("express");
const router = express.Router();
const controllerStock = require("../controller/stock");

router.get("/", controllerStock.checkStock);
router.get("/department/:part_code", controllerStock.stockDepartment);

module.exports = router;
