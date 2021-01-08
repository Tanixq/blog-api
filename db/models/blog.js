const mongoose = require('mongoose')
const { Schema } = mongoose
const { blogCategoryEnum, blogStatusEnum } = require('../../src/common/helpers/enum')

const blogSchema = new Schema({
    title: { type: String, required: true, unique: true, trim: true },
    content: { type: String, required: true },
    author: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
    thumb_image_path: {
        type: String,
        required: true
    },
    blog_status: { type: String, enum: blogStatusEnum, default: 'pending' },
    category: { type: String, enum: blogCategoryEnum, default: ['other'] }
},
{
    timestamps: true
})

module.exports = mongoose.model('Blog', blogSchema)
