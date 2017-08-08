var Campground = require('./models/campground');
var localStrategy = require('passport-local');
var Comment = require('./models/comment');
var bodyParser = require('body-parser');
var User = require('./models/user')
var mongoose = require('mongoose');
var passport = require('passport');
var seedDB = require('./seeds');
var express = require('express');
var app = express();


mongoose.connect("mongodb://localhost/yelp_camp", { useMongoClient: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

seedDB();

// PASSPORT CONFIGURATION
app.use(require('express-session')({
  secret: 'My secret passphrase',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

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
      res.render('campgrounds/index', { campgrounds: allCampgrounds });
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
  res.render('campgrounds/new');
});

// SHOW ROUTE - shows more info about individual campground
app.get('/campgrounds/:id', (req, res) => {
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

// ====================
// COMMENTS ROUTES
// ====================

app.get('/campgrounds/:id/comments/new', (req, res) => {
  // Find campgrounds by id
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.log(err);
    } else {
      res.render('comments/new', { campground: campground });
    }
  });
});

app.post('/campgrounds/:id/comments', (req, res) => {
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
          campground.comments.push(comment);
          campground.save();
          res.redirect(`/campgrounds/${campground._id}`)
        }
      });
    }
  });
});

// ====================
// AUTH ROUTES
// ====================

app.get('/register', (req, res) => {
  res.render('register');
});

app.post('/register', (req, res) => {
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

// SHOW login form
app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', passport.authenticate('local',
  {
    successRedirect: '/campgrounds',
    failureRedirect: '/login'
  }), (req, res) => {

  });



app.listen(3000, () => {
  console.log('Yelp Camp server running on port 3000');
});