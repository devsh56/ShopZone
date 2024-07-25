const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    maxlength: 50,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.']
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  role: {
    type: String,
    required: true
  },
  createdProducts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    }
  ],
  cart: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    }
  ],
  count: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});
userSchema.index({ username: 1 }, { unique: true });
userSchema.index({ email: 1 }, { unique: true });

module.exports = mongoose.model("User", userSchema); 
