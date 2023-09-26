const express = require("express");
const router = express.Router();
const controllerProject = require("../controller/project");

router.get("/:id", controllerProject.getDetailProject);
router.get("/", controllerProject.getProject);
router.post("/", controllerProject.createProject);

module.exports = router;
