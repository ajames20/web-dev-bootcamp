var mongoose = require('mongoose');

// SCHEMA SETUP
const campgroundsSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});

module.exports = mongoose.model('Campground', campgroundsSchema);