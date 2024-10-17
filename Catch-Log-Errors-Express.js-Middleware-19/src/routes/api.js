const express = require("express");
const router = express.Router();
const AuthVerification = require("../middlewares/AuthVerification");
const UserController = require("../controllers/UserController");


//! User
router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/logout", UserController.logout);
router.get("/profile-read", AuthVerification, UserController.profile_read);
router.post("/send-email", AuthVerification, UserController.send_Email);


module.exports = router;
