const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const physiotherapistSchema = new Schema({
    name: String,
    certificates: String,
    governorate: String,
    telephone: String,
    fees: String,
    dates: String,
});

module.exports = mongoose.model('Physioherapist', physiotherapistSchema);