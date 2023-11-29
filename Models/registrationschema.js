const mongoose = require('mongoose');

const registeredPhoneNumberSchema = new mongoose.Schema({
  phoneNumber: { type: String },
  adminphoneNumber:{ type: String },
  name: { type: String },
  email: { type: String },
  companyname: { type: String },
  brandname: {type:String},
  gst:{type:String},
  address:{type:String},
  streetname:{type:String},
  pincode:{type:String},
  city:{type:String},
  state:{type:String},
  country:{type:String},
  website:{type:String},
  image: { type: String },
  currentdate:{ type: String },
  deviceId: { type: String },
  adminaccept: { type: Boolean, default: false },
  role: { type: String },
  count: { type: Number, default: 3 }, // Set a default value for the initial user limit
});

const RegisteredPhoneNumber = mongoose.model('RegisteredPhoneNumber', registeredPhoneNumberSchema);
module.exports = RegisteredPhoneNumber;