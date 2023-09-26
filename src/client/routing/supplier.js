const express = require("express");
const router = express.Router();
const controllerSupplier = require("../controller/supplier");

router.post("/", controllerSupplier.createSupplier);
router.get("/", controllerSupplier.checkSupplier);
router.get("/export", controllerSupplier.exportCSV);

module.exports = router;
