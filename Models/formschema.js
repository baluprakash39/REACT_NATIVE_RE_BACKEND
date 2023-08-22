const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
        section : { type: String},
        vehiclename : { type: String},
        model: { type: String},
        EngineCC:{type: String},
        vehiclecolor:{ type: String},
        adminallimages:{type:Array},
        cardimages:{type:String},
        exShowroomPrice: {type: String},
        showroomPrice: {type: String},
        insurance: {type: String},
        registration: {type: String},
        roadtax:{type:String},
        handelingcharges:{type:String},
        logisticscharges:{type:String},
        othercharges:{type:String},
        GST:{type:String},
        accessoriestype:{type:String},
        safetyaccessories:{type:Array},
        windshields:{type:Array},
        seats:{type:Array},
        backrests:{type:Array},
        storageaccessories:{type:Array},
        enginegaurds:{type:Array},
        sumpgaurds:{type:Array},
        otheraccessories:{type:Array},
        accessoriesname:{type:String},
        accessoriesvalue:{type:String}
      });     
 const Form = mongoose.model('Formdb', formSchema);   
 module.exports = Form;