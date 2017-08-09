var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');

// ROOT ROUTE
router.get('/', (req, res) => {
  res.render('landing');
});

// REGISTER ROUTE - Form 
router.get('/register', (req, res) => {
  res.render('register');
});

// Sign Up Logic
router.post('/register', (req, res) => {
  var newUser = new User({ username: req.body.username });

  User.register(newUser, req.body.password, (err, user) => {
    if (err) {
      console.log(err);

      return res.render('/register');
    }
    passport.authenticate('local')(req, res, () => {
      res.redirect('/campgrounds');
    });
  });
});

// SHOW Login Form
router.get('/login', (req, res) => {
  res.render('login');
});

// LOGIN Logic
router.post('/login', passport.authenticate('local',
  {
    successRedirect: '/campgrounds',
    failureRedirect: '/login'
  }), (req, res) => {

  });

// LOGOUT 
router.get('/logout', (req, res) => {
  req.logOut();
  res.redirect('/campgrounds');
});

// MIDDLEWARE isLoggedIn
function isLoggedIn (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');

}

module.exports = router;