const mongoose = require('mongoose');

/**
 * mongo entities have an ObjectId.
 * So, a Contact-Keeper User will have an ObjectId.
 * When a Contact entity is created on mongo, it
 * will have a user field with the value of the
 * ObjectId of the logged on User.
 */
const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('user', UserSchema);
