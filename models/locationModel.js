const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
  },
},{timestamps:true});

const LocationModel = mongoose.model('Location', locationSchema);

module.exports = LocationModel;
