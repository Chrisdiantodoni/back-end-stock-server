const express = require("express");
const router = express.Router();
const controllerApproval = require("../controller/approvalProject");

router.put("/approve/:id", controllerApproval.approveProject);
router.put("/reject/:id", controllerApproval.rejectProject);

module.exports = router;
