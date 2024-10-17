import express from "express";
const router = express.Router();
import AuthMiddleware from "../app/middlewares/AuthMiddleware.js";
import * as UsersController from "../app/controllers/UsersController.js";
import * as InvoiceController from "../app/controllers/InvoiceController.js";

// Users..............
router.post("/register", UsersController.register);
router.post("/login", UsersController.login);
router.get("/profile-read", AuthMiddleware, UsersController.profileRead);
router.get("/logout", AuthMiddleware, UsersController.logOut);
router.get(
  "/recover-verify-email/:email",
  UsersController.recoverVerifyEmailUser
);
router.get(
  "/recover-verify-otp/:email/:otp",
  UsersController.recoverVerifyOTPUser
);
router.post("/reset-password/:email/:otp", UsersController.resetPasswordUser);

// SSl..................
router.post("/create-invoice", InvoiceController.CreateInvoice);
router.post("/payment-success/:trxID", InvoiceController.PaymentSuccess);
router.post("/payment-cancel/:trxID", InvoiceController.PaymentCancel);
router.post("/payment-fail/:trxID", InvoiceController.PaymentFail);
router.post("/payment-ipn/:trxID", InvoiceController.PaymentIPN);

export default router;
