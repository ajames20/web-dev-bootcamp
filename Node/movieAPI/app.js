// General search: http://www.omdbapi.com/?s=guardians+of+the+galaxy&apikey=thewdb 

// Search with Movie ID: http://www.omdbapi.com/?i=tt3896198&apikey=thewdb 

const express = require('express');
const request = require('request');
const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('search');
});

app.get('/results', (req, res) => {
  var query = req.query.search.toLowerCase();
  var URL = `http://www.omdbapi.com/?s=${query}&apikey=thewdb`;

  request(URL, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const data = JSON.parse(body)
      res.render('results', { data: data }); // Print the HTML for the Google homepage. 
    }
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
  });
});


app.listen(3000, () => {
  console.log('Movie app started on port 3000')
});