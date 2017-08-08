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

var commentsRoutes = require('./routes/comments');
var campgroundRoutes = require('./routes/campgrounds');
var indexRoutes = require('./routes/index');


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

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

app.use('/', indexRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/comments', commentsRoutes);

app.listen(3000, () => {
  console.log('Yelp Camp server running on port 3000');
});