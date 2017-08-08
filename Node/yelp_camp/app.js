const Campground = require('./models/campground');
const seedDB = require('./seeds');
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const app = express();


mongoose.connect("mongodb://localhost/yelp_camp", { useMongoClient: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

seedDB();

app.get('/', (req, res) => {
  res.render('landing');
});

// INDEX ROUTE - show all campgrounds
app.get('/campgrounds', (req, res) => {
  // Get all campgrounds from db and then render campgrounds
  Campground.find({}, (err, allCampgrounds) => {
    if (err) {
      console.log(err);
    } else {
      res.render('index', { campgrounds: allCampgrounds });
    };
  });
});

// CREATE ROUTE - add new campground to DB
app.post('/campgrounds', (req, res) => {
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var newCampground = { name: name, image: image, description: desc };
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

// NEW ROUTE - show form to create new campground
app.get('/campgrounds/new', (req, res) => {
  res.render('new.ejs');
});

// SHOW ROUTE - shows more info about individual campground
app.get('/campgrounds/:id', (req, res) => {
  // Find campground by ID
  Campground.findById(req.params.id).populate('comments').exec((err, foundCampground) => {
    if (err) {
      console.log(err)
    } else {
      // Render that individual campground
      res.render('show', { campground: foundCampground })
    }
  });
});

app.listen(3000, () => {
  console.log('Yelp Camp server running on port 3000');
});