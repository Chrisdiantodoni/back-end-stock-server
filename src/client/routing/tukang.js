const express = require("express");
const router = express.Router();
const controllerTukang = require("../controller/tukang");

router.post("/", controllerTukang.addTukang);
router.get("/", controllerTukang.getTukang);
router.get("/export", controllerTukang.export);

module.exports = router;
