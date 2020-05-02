const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userPatientSchema = new Schema({
    name: String,
    email: String,
    password: String,
    token: String,
    tokenExpiration: String

});

module.exports = mongoose.model('UserPatient', userPatientSchema);