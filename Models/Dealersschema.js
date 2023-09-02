const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
    companyname:{type:String},
    companyaddress:{type:String},
    streetname:{type:String},
    city:{type:String},
    pincode:{type:String},
    state:{type:String},
    country:{type:String},
    contactnumber:{type:String},
    emailid:{type:String},
    website:{type:String},
    adminallimages:{type:Array},
})
  
 const Form = mongoose.model('dealersdb', formSchema);   
 module.exports = Form;