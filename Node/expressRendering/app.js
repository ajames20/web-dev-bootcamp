var express = require('express');
var app = express();

app.get('/', (req, res) => {
  res.render('index.ejs');
});

app.get('/sendingInfo/:name', (req, res) => {
  var name = req.params.name;
  res.render('info.ejs', { name: name });
});

app.listen(3000, () => {
  console.log('App Running on port 3000')
});