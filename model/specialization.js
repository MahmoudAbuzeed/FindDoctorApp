const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const specializationSchema = new Schema({
    name: String
   
   
});

module.exports = mongoose.model('Specialization', specializationSchema);