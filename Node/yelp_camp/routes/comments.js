var express = require('express');
var router = express.Router({ mergeParams: true });
var Campground = require('../models/campground');
var User = require('../models/user');
var Comment = require('../models/comment');

// COMMENTS ROUTE - New
router.get('/new', isLoggedIn, (req, res) => {
  // Find campgrounds by id
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.log(err);
    } else {
      res.render('comments/new', { campground: campground });
    }
  });
});

// Comments Create
router.post('/', isLoggedIn, (req, res) => {
  // Look up campground by id
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.log(err);
      res.redirect('/campgrounds');
    } else {
      // Create new comment
      Comment.create(req.body.comment, (err, comment) => {
        if (err) {
          console.log(err);
          res.redirect('/campgrounds');
        } else {
          // Add username and id to comment
          // Save comment
          campground.comments.push(comment);
          campground.save();
          res.redirect(`/campgrounds/${campground._id}`)
        }
      });
    }
  });
});

// MIDDLEWARE isLoggedIn
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/login');
  }
}

module.exports = router;