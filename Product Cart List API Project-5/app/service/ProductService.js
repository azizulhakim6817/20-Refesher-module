import ProductModel from "../model/ProductModel.js";

//! ProductService
export const CreateProductService = async (req) => {
  try {
    let ReqBody = req.body;
    const data = await ProductModel.create(ReqBody);
    return { status: true, data: data };
  } catch (error) {
    return { status: false, error: error.toString() };
  }
};
//! Read ProductService
export const ReadProductService = async (req) => {
  try {
    let ReqBody = req.body;
    const data = await ProductModel.find(ReqBody);
    return { status: true, data: data };
  } catch (error) {
    return { status: false, error: error.toString() };
  }
};
