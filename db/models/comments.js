const mongoose = require('mongoose')
const { Schema } = mongoose

const commentSchema = new Schema({
    blog_id: { type: mongoose.Schema.ObjectId, ref: 'Blog', required: true },
    user_id: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
    comment_text: { type: String, required: true },
    claps: [{ user_id: { type: mongoose.Schema.ObjectId, ref: 'User' } }],
    reply_to: { type: mongoose.Schema.ObjectId, ref: 'Comment' }
},
{
    timestamps: true
})

module.exports = mongoose.model('Comment', commentSchema)
