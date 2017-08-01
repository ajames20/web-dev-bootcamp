var express = require('express');
var app = express();

app.get('/', (req, res) => {
  res.send('Hi there welcome to my assignment.');
});

app.get('/speak/:animal', (req, res) => {
  var animal = req.params.animal.toLowerCase()
  var sounds = {
    dog: 'Woof Woof',
    cat: 'I hate you Human!',
    pig: 'Oink',
    cow: 'Mooo',
    fish: '...'
  }
  let sound = sounds[animal]
  res.send(`The ${animal} says ${sound}`)
});

app.get('/repeat/:greeting/:num', (req, res) => {
  let num = Number(req.params.num);
  let greeting = req.params.greeting;
  let repeatString = '';

  for (let i = 0; i < num; i++) {

    repeatString += `${greeting} `
  };
  res.send(`${repeatString}`)
});

app.get('*', (req, res) => {
  res.send('Sorry Page not found...What are you doing with your life?')
});


app.listen(3000, () => {
  console.log('App running on port 3000')
});