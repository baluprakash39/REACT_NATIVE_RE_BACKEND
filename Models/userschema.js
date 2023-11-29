mongoose = require('mongoose');

const RegisteredUserSchema = new mongoose.Schema({
  name: { type: String },
  phoneNumber: { type: String },
  companyname: {type: mongoose.Schema.Types.ObjectId ,ref: 'RegisteredPhoneNumber'},
  role: { type: String },
  adminphoneNumber:{ type:String },
  currentdate:{ type: String },
  deviceId: { type: String },
  adminaccept: { type: Boolean, default: false },  // Added this line with a default value
});

const RegisteredUser = mongoose.model('RegisteredUser', RegisteredUserSchema);
module.exports = RegisteredUser;