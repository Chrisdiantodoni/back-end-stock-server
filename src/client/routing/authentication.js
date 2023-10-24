const express = require("express");
const router = express.Router();
const controllerAuthentication = require("../controller/authentication");

router.get("/", controllerAuthentication.getlistUser);
router.post("/login", controllerAuthentication.login);
router.post("/register", controllerAuthentication.register);
router.get("/:id", controllerAuthentication.getUserDetail);
router.put("/update-password/:id", controllerAuthentication.setupNewPassword);
router.put("/update-user/:id", controllerAuthentication.updateUser);
router.patch("/reset-password/:id", controllerAuthentication.resetPassword);

module.exports = router;
