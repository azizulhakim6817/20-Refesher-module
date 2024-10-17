import { CreateCartService } from "../service/CartListService.js";



export const CreateCart = async (req, res) => {
    let result = await CreateCartService(req);
    return res.status(200).json(result);
};