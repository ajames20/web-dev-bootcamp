const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

mongoose.connect("mongodb://localhost/yelp_camp", { useMongoClient: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// SCHEMA SETUP
const campgroundsSchema = new mongoose.Schema({
  name: String,
  image: String
});

const Campground = mongoose.model('Campground', campgroundsSchema);

app.get('/', (req, res) => {
  res.render('landing');
});

app.get('/campgrounds', (req, res) => {
  // Get all campgrounds from db and then render campgrounds
  Campground.find({}, (err, allCampgrounds) => {
    if (err) {
      console.log(err);
    } else {
      res.render('campgrounds', { campgrounds: allCampgrounds });
    };
  });
});

app.post('/campgrounds', (req, res) => {
  var name = req.body.name;
  var image = req.body.image;
  var newCampground = { name: name, image: image };
  // Create a new Campground and save to DB
  Campground.create(newCampground, (err, newlyCreated) => {
    if (err) {
      console.log(err);
    } else {
      // redirect to campgrounds page
      res.redirect('/campgrounds');
    }
  });
});

app.get('/campgrounds/new', (req, res) => {
  res.render('new.ejs');
});

app.listen(3000, () => {
  console.log('Yelp Camp server running on port 3000');
});