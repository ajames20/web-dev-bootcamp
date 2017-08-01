var express = require('express');
var app = express();

app.get('/', (req, res) => {
  res.send('hi there');
});
app.get('/bye', (req, res) => {
  res.send('Goodbye')
});
app.get('/dog', (req, res) => {
  res.send('Meow')
});


app.listen(3000, () => {
  console.log('App running on port 3000')
});