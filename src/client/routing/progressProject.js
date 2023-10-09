const express = require("express");
const router = express.Router();
const controllerProject = require("../controller/progress");
const { multer } = require("../../../utils");

router.post(
  "/weekly",
  multer.uploadProgress,
  controllerProject.submissionPayWeekly
);
router.post(
  "/daily",
  multer.uploadProgress,
  controllerProject.submissionPayDaily
);
router.get("/", controllerProject.getProjectProgress);
router.get("/daily/:id", controllerProject.getDetailProjectProgressDaily);
router.get("/weekly/:id", controllerProject.getDetailProjectProgressWeekly);

module.exports = router;
