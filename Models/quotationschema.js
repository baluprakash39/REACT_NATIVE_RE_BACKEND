const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  customername:{type:String},
  address:{type:String},
  mobilenumber:{type:String},
  emailid:{type:String},
  vehiclename : { type: String},
  model: { type: String},
  EngineCC:{type: String},
  vehiclecolor:{ type: String},
  images:{type:Array},
  RTOcharges:{type: String},
  onroadprice:{type: String},
  exShowroomPrice: {type: String},
  registration: {type: String},
  grandtotal:{type: String},
  insurance: [{
    insurancetext:{ type: String},
    insurancevalue:{ type: String}
  }],
  hypothication: [{
    hypothicationtext:{ type: String},
    hypothicationvalue:{ type: String}
  }],
  extendedwarranty:[{
    warrantytext:{ type: String},
    warrantyvalue:{ type: String}
  }]
  
})
  const Form = mongoose.model('Formdb02', formSchema);   
  module.exports = Form;