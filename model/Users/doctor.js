const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userDoctorSchema = new Schema({
    name: String,
    specialization: String,
    email: String,
    password: String,
    token: String,
    tokenExpiration: String
});

module.exports = mongoose.model('UserDoctor', userDoctorSchema);