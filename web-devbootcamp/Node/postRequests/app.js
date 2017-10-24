var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

var friends = ['Andrew', 'Shapel', 'Gabe', 'Jeff', 'Tommy'];


app.get('/', (req, res) => {
  res.render('index');
});

app.get('/friends', (req, res) => {
  res.render('friends', { friends: friends });
});

app.post('/addFriend', (req, res) => {
  var newFriend = req.body.newFriend;
  friends.push(newFriend);
  res.redirect('/friends');
});

app.listen(3000, () => {
  console.log('The server is listening to port 3000');
});