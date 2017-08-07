var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var express = require('express');
var app = express();

mongoose.connect('mongodb://localhost/restful_blog_app', { useMongoClient: true });
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

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

app.get('/blogs', (req, res) => {
  Blog.find({}, (err, blogs) => {
    if (err) {
      console.log(err);
    } else {
      res.render('index', { blogs: blogs });
    }
  });
});

app.listen(3000, () => {
  console.log('Blog Server running on port 3000.')
});

