const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dermatologistSchema = new Schema({
    name: String,
    certificates: String,
    governorate: String,
    telephone: String,
    fees: String,
    dates: String,
});

module.exports = mongoose.model('Dermatologist', dermatologistSchema);