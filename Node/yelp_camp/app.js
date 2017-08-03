const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

const campgrounds = [
  { name: 'Salmon Creek', image: 'https://farm5.staticflickr.com/4153/4835814837_feef6f969b.jpg' },
  { name: 'Goats Breath', image: 'https://farm4.staticflickr.com/3270/2617191414_c5d8a25a94.jpg' },
  { name: 'Bears Water', image: 'https://farm3.staticflickr.com/2259/2182093741_164dc44a24.jpg' }
];

app.get('/', (req, res) => {
  res.render('landing');
});

app.get('/campgrounds', (req, res) => {
  res.render('campgrounds', { campgrounds: campgrounds })
});

app.post('/campgrounds', (req, res) => {
  let name = req.body.name;
  let image = req.body.image;
  let newCampground = { name: name, image: image };
  campgrounds.push(newCampground);
  // redirect to campgrounds page
  res.redirect('/campgrounds');
});

app.get('/campgrounds/new', (req, res) => {
  res.render('new.ejs');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});