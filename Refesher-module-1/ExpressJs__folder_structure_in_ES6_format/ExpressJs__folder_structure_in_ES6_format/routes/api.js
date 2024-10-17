import express from "express";
const router = express.Router();
import AuthMiddleware from "../app/middlewares/AuthMiddleware.js";
import * as UsersController from "../app/controllers/UsersController.js";
//import { upload } from "../app/controllers/FileUpload.js";

// Users
router.post("/register", UsersController.register);
router.post("/login", UsersController.login);
router.get("/profile-read", AuthMiddleware, UsersController.profileRead);
router.get("/logout", AuthMiddleware, UsersController.logOut);

//photo upload file....................................................
/* router.get("/upload/", upload.array("img", 5), (req, res) => {
  console.log(req.files);
  res.status(200).json({ status: "success", data: req.files });
}); */
export default router;
