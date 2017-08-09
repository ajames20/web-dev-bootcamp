var Campground = require('../models/campground');
var middleWare = require('../middleware');
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
router.post('/', middleWare.isLoggedIn, (req, res) => {
  var name = req.body.name;
  var image = req.body.image;
  var price = req.body.price;
  var desc = req.body.description;
  var author = {
    id: req.user.id,
    username: req.user.username
  };
  var newCampground = {
    name,
    image,
    author,
    price,
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
router.get('/new', middleWare.isLoggedIn, (req, res) => {
  res.render('campgrounds/new');
});

// SHOW ROUTE - shows more info about individual campground
router.get('/:id', (req, res) => {
  // Find campground by ID
  Campground.findById(req.params.id).populate('comments').exec((err, foundCampground) => {
    if (err) {
      console.log(err);
    } else {
      // Render that individual campground
      res.render('campgrounds/show', { campground: foundCampground });
    }
  });
});

// EDIT ROUTE for campgrounds
router.get('/:id/edit', middleWare.campgroundOwnership, (req, res) => {
  Campground.findById(req.params.id, (err, foundCampground) => {
    res.render('campgrounds/edit', { campground: foundCampground });
  });
});

// UPDATE ROUTE for campgrounds
router.put('/:id', middleWare.campgroundOwnership, (req, res) => {
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect(`/campgrounds/${req.params.id}`);
    }
  });
});

// DESTROY ROUTE
router.delete('/:id', middleWare.campgroundOwnership, (req, res) => {
  Campground.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      res.redirect('/campgrounds');
    } else {
      res.redirect('/campgrounds');
    }
  });
});

module.exports = router;