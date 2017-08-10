var localStrategy = require('passport-local');
var bodyParser = require('body-parser');
var User = require('./models/user');
var mongoose = require('mongoose');
var passport = require('passport');
var methodOverride = require('method-override');
var seedDB = require('./seeds');
var flash = require('connect-flash');
var express = require('express');
var app = express();

// REQUIRE ROUTES 
var campgroundRoutes = require('./routes/campgrounds');
var commentsRoutes = require('./routes/comments');
var indexRoutes = require('./routes/index');


mongoose.connect("mongodb://localhost/yelp_camp", { useMongoClient: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.use(flash());
// seedDB(); // seed the database

// PASSPORT CONFIGURATION
app.use(require('express-session')({
  secret: 'My secret passphrase',
  resave: false,
  saveUninitialized: false
}));

app.locals.moment = require('moment');
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  next();
});

app.use('/', indexRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/comments', commentsRoutes);

app.listen(3000, () => {
  console.log('Yelp Camp server running on port 3000');
});