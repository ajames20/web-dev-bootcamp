var Campground = require('../models/campground');
var middleWare = require('../middleware');
var express = require('express');
var router = express.Router();
var geocoder = require('geocoder');

// INDEX ROUTE - show all campgrounds
router.get('/', (req, res) => {
  // Get all campgrounds from db and then render campgrounds
  Campground.find({}, (err, allCampgrounds) => {
    if (err) {
      console.log(err);
    } else {
      res.render('campgrounds/index', {
        campgrounds: allCampgrounds,
        page: 'campgrounds'
      });
    }
  });
});

// CREATE ROUTE - add new campground to DB
router.post('/', middleWare.isLoggedIn, (req, res) => {
  var name = req.body.name;
  var image = req.body.image;
  var cost = req.body.cost;
  var desc = req.body.description;
  var author = {
    id: req.user.id,
    username: req.user.username
  };
  var newCampground = {
    name,
    image,
    cost,
    description: desc,
    author
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
router.put("/:id", (req, res) => {
  geocoder.geocode(req.body.location, (err, data) => {
    var lat = data.results[0].geometry.location.lat;
    var lng = data.results[0].geometry.location.lng;
    var location = data.results[0].formatted_address;
    var newData = {
      name: req.body.name,
      image: req.body.image,
      description: req.body.description,
      cost: req.body.cost,
      location,
      lat,
      lng
    };

    Campground.findByIdAndUpdate(req.params.id, { $set: newData }, (err, campground) => {
      if (err) {
        req.flash("error", err.message);
        res.redirect("back");
      } else {
        req.flash("success", "Successfully Updated!");
        res.redirect("/campgrounds/" + campground._id);
      }
    });
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