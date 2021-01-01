const mongoose = require("mongoose");
const { Schema } = mongoose;

const blogSchema = new Schema({
  title: { type: String, required: true, unique: true, trim: true},
  content: { type: String, required: true},
  author: { 
    author_name: { type: String, required: true},
    author_email: { type: String, required: true},
    author_id: { type: String, required: true}
   },
  thumb_image_path: {
    type: String,
    required: true
  },
  blog_status: { type: String, enum: ['approved','rejected','pending'] , default: 'pending', required: true }
},
{
  timestamps: true
});

module.exports = mongoose.model("Blog", blogSchema);
