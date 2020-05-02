const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const patientSchema = new Schema({
    name: String,
    email: String,
    password: String
});

module.exports = mongoose.model('Patient', patientSchema);