var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var express = require('express');
var methodOverride = require('method-override')
var app = express();

mongoose.connect('mongodb://localhost/restful_blog_app', { useMongoClient: true });
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// APP CONFIG
var blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: { type: Date, default: Date.now }
});

// MONGOOSE/MODEL CONFIG
var Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
//   title: 'Hello World!',
//   image: 'https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg',
//   body: 'Hello this is my blog post.'
// });

// RESTFUL ROUTES
app.get('/', (req, res) => {
  res.redirect('/blogs');
});

// INDEX ROUTE
app.get('/blogs', (req, res) => {
  Blog.find({}, (err, blogs) => {
    if (err) {
      console.log(err);
    } else {
      res.render('index', { blogs: blogs });
    }
  });
});

// NEW ROUTE
app.get('/blogs/new', (req, res) => {
  res.render('new');
});

// CREATE ROUTE
app.post('/blogs', (req, res) => {
  // create blog
  Blog.create(req.body.blog, (err, newBlog) => {
    if (err) {
      res.render('new');
    } else {
      // redirect to blogs
      res.redirect('/blogs');
    }
  });
});

// SHOW ROUTE
app.get('/blogs/:id', (req, res) => {
  Blog.findById(req.params.id, (err, foundBlog) => {
    if (err) {
      res.redirect('/blogs');
    } else {
      res.render('show', { blog: foundBlog });
    }
  });
});

// EDIT ROUTE
app.get('/blogs/:id/edit', (req, res) => {
  Blog.findById(req.params.id, (err, foundBlog) => {
    if (err) {
      res.redirect('/blogs');
    } else {
      res.render('edit', { blog: foundBlog });
    }
  });
});

// UPDATE REQUEST
app.put('/blogs/:id', (req, res) => {
  res.send('Update Route');
});

app.listen(3000, () => {
  console.log('Blog Server running on port 3000.')
});

