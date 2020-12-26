const mongoose = require("mongoose");
const { Schema } = mongoose;

const blogSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  author: { type: String, required: true },
  thumb_image: {
    type: String,
    required: true
  },
  approved: { type: Boolean, required: true },
});

module.exports = mongoose.model("Blog", blogSchema);
