const mongoose = require('mongoose');

const registeredPhoneNumberSchema = new mongoose.Schema({
  phoneNumber: { type: String },
  name: { type: String },
  email: { type: String },
  companyname: { type: String },
  deviceId: { type: String },
  adminaccept: { type: Boolean, default: false },
  role: { type: String },
});

const RegisteredPhoneNumber = mongoose.model('RegisteredPhoneNumber', registeredPhoneNumberSchema);
module.exports = RegisteredPhoneNumber;

const formSchema = new mongoose.Schema({
  username: { type: String },
  userContactNumber: { type: String },
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'RegisteredPhoneNumber' },
  role: { type: String },
});

const RegisteredUser = mongoose.model('RegisteredUser', formSchema);
module.exports = RegisteredUser;