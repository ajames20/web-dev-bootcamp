var express = require('express');
var app = express();

app.use(express.static('public'));// Allows static assets to be served
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/sendingInfo/:name', (req, res) => {
  var name = req.params.name;
  res.render('info', { name: name });
});

app.get('/posts', (req, res) => {
  var posts = [
    { title: 'Post 1', author: 'Andrew' },
    { title: 'Post 2', author: 'Gabe' },
    { title: 'Post 3', author: 'Shapel' }
  ];
  res.render('posts', { posts: posts });
});

app.listen(3000, () => {
  console.log('App Running on port 3000')
});