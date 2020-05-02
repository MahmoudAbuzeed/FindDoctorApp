const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const doctorsSchema = new Schema({
    name: String,
    certificates: String,
    address: String,
    telephone: String,
    fees: String,
    dates: String,
    governorateId: String,
    specializationId: String
    
});

module.exports = mongoose.model('Doctors', doctorsSchema);