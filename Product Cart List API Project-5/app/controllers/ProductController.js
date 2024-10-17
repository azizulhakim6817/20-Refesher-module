import {
  CreateProductService,
  ReadProductService,
} from "../service/ProductService.js";

export const CreateProduct = async (req, res) => {
  let result = await CreateProductService(req);
  return res.status(200).json(result);
};
export const ReadProduct = async (req, res) => {
  let result = await ReadProductService(req);
  return res.status(200).json(result);
};
