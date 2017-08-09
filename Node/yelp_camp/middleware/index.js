var Campground = require('../models/campground');
var Comment = require('../models/comment');
// all middleware
var middelwareObj = {};

// MIDDLEWARE isLoggedIn
middelwareObj.isLoggedIn = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');

};

middelwareObj.campgroundOwnership = function (req, res, next) {
  if (req.isAuthenticated()) {
    Campground.findById(req.params.id, (err, foundCampground) => {
      if (err) {
        res.redirect('back');
      } else {
        // Does user own campground
        if (foundCampground.author.id.equals(req.user._id)) {
          next();
        } else {
          res.redirect('back');
        }
      }
    });
  } else {
    res.redirect('back');
  }
};

middelwareObj.checkCommentOwnership = function (req, res, next) {
  if (req.isAuthenticated()) {
    Comment.findById(req.params.comment_id, (err, foundComment) => {
      if (err) {
        res.redirect('back');
      } else {
        // Does user own comment
        if (foundComment.author.id.equals(req.user._id)) {
          next();
        } else {
          res.redirect('back');
        }
      }
    });
  } else {
    res.redirect('back');
  }
};

module.exports = middelwareObj;