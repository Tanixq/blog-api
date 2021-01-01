const mongoose = require("mongoose");
const bcrypt = require('bcrypt')
const { Schema } = mongoose;

const adminSchema = new Schema(
  {
    admin_username: { type: String, required: true, unique: true },
    admin_password: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

adminSchema.pre('save', async function (next) {
  const admin = this

  // only hash the password if it has been modified (or is new)
  if (!admin.isModified('admin_password')) return next();

  try {
    const hashedPassword = await bcrypt.hash(admin.admin_password, 5)
    admin.admin_password = hashedPassword
    next()
  } catch (error) {
    return next(error)
  }
})

module.exports = mongoose.model("Admin", adminSchema);
