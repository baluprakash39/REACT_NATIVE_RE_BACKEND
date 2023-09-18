const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({

Basic:{type:String},
Nildip:{type:String},
Ep:{type:String},
RTI:{type:String},
Yes:{type:String},
No:{type:String},
fouryears:{type:String},
fiveyears:{type:String},
fiveyearsplusRSA:{type:String}
})
const Form = mongoose.model('Caredb', formSchema);   
module.exports = Form;