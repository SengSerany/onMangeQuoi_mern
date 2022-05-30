const mongoose = require('mongoose');
const validator = require('validator');
const passportLocalMongoose = require('passport-local-mongoose');

const AuthSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'You must add a username'],
    },
    email: {
      type: String,
      unique: true,
      validate: {
        validator: validator.isEmail,
        message: 'Please provide valid email',
      },
      required: [true, 'You must add an email'],
    },
  },
  { timestamps: true }
);

AuthSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

module.exports = mongoose.model('Auth', AuthSchema);
