const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  section : { type: String},
  vehiclename : { type: String},
  model: { type: String},
  EngineCC:{type: String},
  vehiclecolor:{ type: String},
  adminallimage:{type:String},
  exShowroomPrice: {type: String},
  registration: {type: String},
  roadtax:{type:String},
  phoneNumber:{type:String},
  insurance: [{
    Basic:{ type: String},
    Nildip:{type: String},
    Ep:{type: String},
    RTI:{type: String},
  }
],
  hypothication: [{
    Yes:{ type: String},
    No:{ type: String},
  }],
  extendedwarranty:[{
    fouryears:{ type: String},
    fiveyears:{ type: String},
    fiveplusRSAyears:{ type: String},
  }],
  rsa:[{
    oneyear:{ type: String},
    twoyears:{ type: String},
    threeyears:{ type: String},
  }],
  colours: [{
    colourstext: { type: String },
    coloursvalue: { type: String }
  }],

  mirrors:[{
    mirrorstext: { type: String },
    mirrorsvalue: { type: String }
  }],

  oilfillercap:[{
    oilfillercaptext: { type: String },
    oilfillercapvalue: { type: String }
  }],

  headlight:[{
    headlighttext: { type: String },
    headlightvalue: { type: String }
  }],

  navigation:[{
    navigationtext: { type: String },
    navigationvalue: { type: String }
  }],

  panniers:[{
    pannierstext: { type: String },
    panniersvalue: { type: String }
  }],
     
  footpegs:[{
    footpegstext: { type: String },
    footpegsvalue: { type: String }
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