const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const governorateSchema = new Schema({
    name: String
   
   
});

module.exports = mongoose.model('Governorate', governorateSchema); 