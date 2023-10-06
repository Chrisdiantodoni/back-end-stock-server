const express = require("express");
const router = express.Router();
const controllerProject = require("../controller/progress");
const { multer } = require("../../../utils");

router.get("/", controllerProject.getProjectProgress);
router.get("/:id", controllerProject.getDetailProjectProgress);

module.exports = router;
