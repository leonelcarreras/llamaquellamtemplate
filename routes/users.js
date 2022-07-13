const express = require("express");
const router = express.Router();

const { body } = require("express-validator")

const userController = require("../controllers/userController");

const validations = require("../middlewares/registrovalidator")
const guestMiddleware = require("../middlewares/guestMiddleware")

const authMiddleware = require("../middlewares/authMiddleware")


router.get("/registro", guestMiddleware, userController.registro);
router.post("/registro", validations, userController.altaUsuario);
router.get("/login", guestMiddleware, userController.login);
router.post("/login", userController.loginProcess);
router.get("/userProfile", authMiddleware, userController.profile);
router.get("/logout/", userController.logout);
router.get("/editProfile", userController.editProfile);
router.get("/adminPanel", userController.adminPanel);

module.exports = router


