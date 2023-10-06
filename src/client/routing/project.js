const express = require("express");
const router = express.Router();
const controllerProject = require("../controller/project");
const { multer } = require("../../../utils");

router.get("/:id", controllerProject.getDetailProject);
router.put(
  "/update/:projectId",
  multer.uploadProject,
  controllerProject.updateProject
);
router.get("/", controllerProject.getProject);
router.post("/", multer.uploadProject, controllerProject.createProject);

module.exports = router;
