var Campground = require('../models/campground');
var express = require('express');
var router = express.Router();

// INDEX ROUTE - show all campgrounds
router.get('/', (req, res) => {
  // Get all campgrounds from db and then render campgrounds
  Campground.find({}, (err, allCampgrounds) => {
    if (err) {
      console.log(err);
    } else {
      res.render('campgrounds/index', { campgrounds: allCampgrounds });
    }
  });
});

// CREATE ROUTE - add new campground to DB
router.post('/', (req, res) => {
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var newCampground = {
    name,
    image,
    description: desc
  };
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
router.get('/new', (req, res) => {
  res.render('campgrounds/new');
});

// SHOW ROUTE - shows more info about individual campground
router.get('/:id', (req, res) => {
  // Find campground by ID
  Campground.findById(req.params.id).populate('comments').exec((err, foundCampground) => {
    if (err) {
      console.log(err)
    } else {
      // Render that individual campground
      res.render('campgrounds/show', { campground: foundCampground })
    }
  });
});

// MIDDLEWARE isLoggedIn
function isLoggedIn (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');

}

module.exports = router;