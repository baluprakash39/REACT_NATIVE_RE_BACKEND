const mongoose = require('mongoose');

const registeredPhoneNumberSchema = new mongoose.Schema({
  phoneNumber: {type:String},
  name:{type:String},
  email:{type:String},
  companyname:{type:String},
  deviceId:{type:String}
});

const RegisteredPhoneNumber = mongoose.model('RegisteredPhoneNumber', registeredPhoneNumberSchema);
module.exports = RegisteredPhoneNumber;