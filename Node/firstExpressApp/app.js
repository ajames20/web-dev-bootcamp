var express = require('express');
var app = express();

app.get('/', (req, res) => {
  res.send('hi there');
});

app.get('/:bye', (req, res) => {
  var subDomain = req.params.bye
  res.send(`Goodbye ${subDomain.toUpperCase()}`)
});

app.get('/dog', (req, res) => {
  res.send('Meow')
});

app.get('*', (req, res) => {
  res.send('You are a star!')
});


app.listen(3000, () => {
  console.log('App running on port 3000')
});