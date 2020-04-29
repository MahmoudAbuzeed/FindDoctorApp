const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const doctorSchema = new Schema({
    name: String,
    specialization: String,
    email: String,
    password: String
});

module.exports = mongoose.model('Doctor', doctorSchema);