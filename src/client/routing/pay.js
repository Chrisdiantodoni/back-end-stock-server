const express = require("express");
const router = express.Router();
const controllerPay = require("../controller/pay");
const { multer } = require("../../../utils");

router.get("/", controllerPay.getListPay);

module.exports = router;
