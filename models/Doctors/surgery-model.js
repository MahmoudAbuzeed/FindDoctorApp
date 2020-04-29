const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const surgerySchema = new Schema({
    name: String,
    certificates: String,
    governorate: String,
    telephone: String,
    fees: String,
    dates: String,
});

module.exports = mongoose.model('Surgery', surgerySchema);