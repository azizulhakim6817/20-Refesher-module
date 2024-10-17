import mongoose from 'mongoose';
const DataSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    des: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const BlogModel = mongoose.model("blogs", DataSchema);

export default BlogModel;
