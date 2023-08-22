const mongoose = require('mongoose');

const accessoriesSchema = new mongoose.Schema ({
    vehiclename:{type: String},
    vehiclemodel:{type:String},
    EngineCC:{type:String},
    colorvarients:{type:String},
    accessoriestype:{type:Array},
    safetyaccessories:{type:String},
    windshields:{type:String},
    seats:{type:String},
    backrests:{type:String},
    storageaccessories:{type:String},
    enginegaurds:{type:String},
    sumpgaurds:{type:String},
    otheraccessories:{type:String},
    accessoriesname:{type:String},
    accessoriesvalue:{type:String}
    
})

const Form = mongoose.model('Form2db', accessoriesSchema)

module.exports = Form;