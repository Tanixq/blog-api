const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const { Schema } = mongoose;

// const userSchema = new Schema(
//   {
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     email_verified: { type: Boolean, required: true, default: false },
//     code: String,
//     code_expired: String
//   },
//   {
//     timestamps: true,
//   }
// );

const userSchema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    email_verified: { type: Boolean, required: true, default: false },
    password: { type: String, required: true },
    code: String,
    expired_at: String
},
{
    timestamps: true
}
)



userSchema.pre('save', async function (next) {
  const user = this

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  try {
    const hashedPassword = await bcrypt.hash(user.password, 5)
    user.password = hashedPassword
    next()
  } catch (error) {
    return next(error)
  }
})

module.exports = mongoose.model('User', userSchema)
