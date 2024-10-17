import axios from "axios";
import FormData from "form-data";

// 1- developer sslcommerz

export const CreateInvoiceService = async (req) => {
  try {
    // working ................

    let tran_id = Math.floor(10000000000 + Math.random() * 900000000);
    let cus_name = "Alex";
    let cus_email = "Alex@gmail.com";
    let cus_add = "House no 42, Dhaka";
    let cus_add2 = "House no 42, Dhaka";
    let cus_city = "Dhaka";
    let cus_state = "Dhaka x";
    let cus_postcode = "2035";
    let cus_country = "Bangladesh";
    let cus_phone = "01814331350";

    // Shipping
    let ship_name = "Alex";
    let ship_add = "House no 42, Dhaka";
    let ship_add2 = "House no 42, Dhaka";
    let ship_city = "Dhaka";
    let ship_state = "Dhaka x";
    let ship_postcode = "2035";
    let ship_country = "Bangladesh";
    let ship_phone = "01814331350";

    let PaymentSetting = {
      store_id: "theme664dfb04bfaf4",
      store_passwd: "theme664dfb04bfaf4@ssl",
      currency: "BDT",
      success_url: "http://localhost:5000/api/payment-success",
      fail_url: "http://localhost:5000/api/payment-fail",
      cancel_url: "http://localhost:5000/api/payment-cancel",
      ipn_url: "http://localhost:5000/api/payment-ipn",
      init_url: "https://sandbox.sslcommerz.com/gwprocess/v3/api.php",
    };

    let form = new FormData();
    // Request Parameters
    form.append("store_id", PaymentSetting.store_id);
    form.append("store_passwd", PaymentSetting.store_passwd);
    form.append("total_amount", 2000);
    form.append("currency", PaymentSetting.currency);
    form.append("tran_id", tran_id);
    form.append("success_url", `${PaymentSetting.success_url}/${tran_id}`);
    form.append("fail_url", `${PaymentSetting.fail_url}/${tran_id}`);
    form.append("cancel_url", `${PaymentSetting.cancel_url}/${tran_id}`);
    form.append("ipn_url", `${PaymentSetting.ipn_url}/${tran_id}`);

    // Customer Information
    form.append("cus_name", cus_name);
    form.append("cus_email", cus_email);
    form.append("cus_add1", cus_add);
    form.append("cus_add2", cus_add2);
    form.append("cus_city", cus_city);
    form.append("cus_state", cus_state);
    form.append("cus_postcode", cus_postcode);
    form.append("cus_country", cus_country);
    form.append("cus_phone", cus_phone);

    // Shipment Information
    form.append("shipping_method", "YES");
    form.append("ship_name", ship_name);
    form.append("ship_add1", ship_add);
    form.append("ship_add2", ship_add2);
    form.append("ship_city", ship_city);
    form.append("ship_state", ship_state);
    form.append("ship_country", ship_country);
    form.append("ship_postcode", ship_postcode);
    form.append("ship_phone", ship_phone);

    // Product Information
    form.append("product_name", "According Invoice");
    form.append("product_category", "According Invoice");
    form.append("product_profile", "According Invoice");
    form.append("product_amount", "According Invoice");

    let SSLRes = await axios.post(PaymentSetting.init_url, form);
    return { status: "success", data: SSLRes.data };
  } catch (e) {
    return { status: "error", error: e.toString() };
  }
};

// Payment Success Service
export const PaymentSuccessService = async (req) => {
  try {
    let trxID = req.params.trxID;

    //  ... our logic here

    return { status: true, data: "success" };
  } catch (error) {
    return { status: false, error: error.toString() };
  }
};

// Payment Fail Service
export const PaymentFailService = async (req) => {
  try {
    let trxID = req.params.trxID;

    //  ... our logic here

    return { status: true, data: "success" };
  } catch (error) {
    return { status: false, error: error.toString() };
  }
};

// Payment Cancel Service
export const PaymentCancelService = async (req) => {
  try {
    let trxID = req.params.trxID;

    //  ... our logic here

    return { status: true, data: "success" };
  } catch (error) {
    return { status: false, error: error.toString() };
  }
};

// Payment IPN Service
export const PaymentIPNService = async (req) => {
  try {
    let trxID = req.params.trxID;

    //  ... our logic here

    return { status: true, data: "success" };
  } catch (error) {
    return { status: false, error: error.toString() };
  }
};
