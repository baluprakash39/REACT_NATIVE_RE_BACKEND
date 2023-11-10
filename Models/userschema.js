const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  username: { type: String },
  userContactNumber: { type: String },
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'RegisteredPhoneNumber' },
  role: { type: String },
});

const RegisteredUser = mongoose.model('RegisteredUser', formSchema);
module.exports = RegisteredUser;