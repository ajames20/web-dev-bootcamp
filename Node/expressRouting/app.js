var express = require('express');
var app = express();

app.get('/', (req, res) => {
  res.send('Hi there welcome to my assignment.');
});

app.get('/speak/:animal', (req, res) => {
  var animal = req.params.animal
  var sound
  if (animal === 'pig') {
    sound = 'Oink'
    res.send(`The ${animal} says ${sound}`)
  } else if (animal === 'cow') {
    sound = 'Moo'
    res.send(`The ${animal} says ${sound}`)
  } else if (animal === 'dog') {
    sound = 'Woof Woof'
    res.send(`The ${animal} says ${sound}`)
  } else {
    res.send('Sorry Page not found...What are you doing with your life?')
  }
});

app.get('/repeat/:greeting/:num', (req, res) => {
  let num = req.params.num;
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