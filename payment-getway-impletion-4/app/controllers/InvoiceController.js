import {
  CreateInvoiceService,
  PaymentCancelService,
  PaymentFailService,
  PaymentIPNService,
  PaymentSuccessService,
} from "../service/InvoiceService.js";

//! Create Invoice
export const CreateInvoice = async (req, res) => {
  let result = await CreateInvoiceService(req);
  return res.status(200).json(result);
};

//! Payment Fail
export const PaymentFail = async (req, res) => {
  let result = await PaymentFailService(req);
  res.redirect(process.env.Origin_HOST_Site + "/profile");
};

//! Payment Cancel
export const PaymentCancel = async (req, res) => {
  let result = await PaymentCancelService(req);
  res.redirect(process.env.Origin_HOST_Site + "/profile");
};

//!   Payment IPN
export const PaymentIPN = async (req, res) => {
  let result = await PaymentIPNService(req);
  res.redirect(process.env.Origin_HOST_Site + "/profile");
};

//!   Payment Success
export const PaymentSuccess = async (req, res) => {
  let result = await PaymentSuccessService(req);
  res.redirect(process.env.Origin_HOST_Site + "/profile");
};
