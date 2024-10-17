import CartModel from "../model/BlogModel.js";



export const CreateCartService = async (req) => {
    try {
        let email = req.headers.email;
        let ReqBody = req.body;
        ReqBody.email = email;

        // Find existing cart
        let existingCart = await CartModel.findOne({
            email: email,
            productID: ReqBody.productID,
            color: ReqBody.color,
            size: ReqBody.size,
        });






        if (!!existingCart === true) {
            let newReqBody = {
                email: email,
                productID: ReqBody.productID,
                color: ReqBody.color,
                size: ReqBody.size,
                qty: parseInt(existingCart.qty) + parseInt(ReqBody.qty), // 10 + 2
            };
            const updateData = await CartModel.updateOne(
                { _id: existingCart._id, email: existingCart.email },
                { $set: newReqBody }
            );
            return { status: true, updateData: updateData };
        } else {
            const data = await CartModel.create(ReqBody);
            return { status: true, data: data };
        }
    } catch (error) {
        return { status: false, error: error.toString() };
    }
};