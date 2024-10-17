import mongoose from 'mongoose';
const DataSchema = mongoose.Schema(
  {
    email: { type: String, required: true },
    productID: { type: mongoose.Schema.Types.ObjectId, required: true },

    color: { type: String, required: true },
    qty: { type: Number, required: true },
    size: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const CartModel = mongoose.model("carts", DataSchema);

export default CartModel;
