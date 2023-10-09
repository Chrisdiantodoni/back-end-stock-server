const express = require("express");
const router = express.Router();
const controllerPay = require("../controller/pay");
const { multer } = require("../../../utils");

router.get("/", controllerPay.getListPay);
router.get("/history/:id", controllerPay.getHistoryPay);
router.put("/pay-daily/:id", controllerPay.PayDaily);
router.put("/pay-weekly/:id", controllerPay.PayWeekly);
router.get("/pay-daily/:id", controllerPay.getPayDetailDaily);
router.get("/pay-weekly/:id", controllerPay.getPayDetailWeekly);

module.exports = router;
