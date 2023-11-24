const mongoose = require('mongoose');

// Define the Section schema
const sectionSchema = new mongoose.Schema({
    Sectionname: { type: String },
});

const Section = mongoose.model('Section', sectionSchema);

module.exports = Section;

