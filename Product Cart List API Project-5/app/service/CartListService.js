import CartModel from "../model/CartModel.js";

export const CreateCartService = async (req) => {
  try {
    let email = req.headers.email;
    let ReqBody = req.body;
    ReqBody.email = email;

    if (ReqBody.qty > 10) {
      return { status: true, data: "You can't add more 10 products!" };
    }
    // Find existing cart
    let existingCart = await CartModel.findOne({
      email: email,
      productID: ReqBody.productID,
      color: ReqBody.color,
      size: ReqBody.size,
    });

    //console.log(existingCart);
    //console.log(ReqBody.qty);

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
