const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImageURL: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

const User = model('User', userSchema);

module.exports = User;
