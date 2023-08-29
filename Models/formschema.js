const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  section : { type: String},
  vehiclename : { type: String},
  model: { type: String},
  EngineCC:{type: String},
  vehiclecolor:{ type: String},
  adminallimages:{type:Array},
  exShowroomPrice: {type: String},
  registration: {type: String},
  roadtax:{type:String},
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
  }],
 
  safetyaccessories: [{
    safetyaccessoriestext: { type: String },
    safetyaccessoriesvalue: { type: String }
  }],

  windshields: [{
    windshieldstext: { type: String },
    windshieldsvalue: { type: String }
  }],

  seats: [{
    seatstext: { type: String },
    seatsvalue: { type: String }
  }],

  backrests: [{
    backreststext: { type: String },
    backrestsvalue: { type: String }
  }],

  storageaccessories: [{
    storageaccessoriestext: { type: String },
    storageaccessoriesvalue: { type: String }
  }],

  enginegaurds: [{
    enginegaurdstext: { type: String },
    enginegaurdsvalue: { type: String }
  }],

  sumpgaurds: [{
    sumpgaurdstext: { type: String },
    sumpgaurdsvalue: { type: String }
  }],

  otheraccessories: [{
    otheraccessoriestext: { type: String },
    otheraccessoriesvalue: { type: String }
  }],
  
});
 const Form = mongoose.model('Formdb', formSchema);   
 module.exports = Form;