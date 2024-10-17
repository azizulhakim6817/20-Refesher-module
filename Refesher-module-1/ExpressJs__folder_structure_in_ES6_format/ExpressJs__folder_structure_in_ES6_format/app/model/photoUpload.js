const mongoose = require("mongoose");

const DataSchema = mongoose.Schema({
  /* email: { type: String },
  frist_name: { type: String },
  lastName: { type: String }, */

  Photo: {
    original: { type: String },
    _id: false,
    thumbnail: { type: String },
  },
});

const Photo = mongoose.model("photoes", DataSchema);

export default Photo;
