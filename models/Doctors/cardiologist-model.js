const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cardiologistSchema = new Schema({
    name: String,
    certificates: String,
    governorate: String,
    telephone: String,
    fees: String,
    dates: String,
    governorateId: String
    
});

module.exports = mongoose.model('Cardiologist', cardiologistSchema);