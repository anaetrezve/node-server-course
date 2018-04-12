const express = require("express");
const hbs = require('hbs');
const app = express();
const fs = require('fs');


hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});
hbs.registerHelper('steamIt', text => {
  return text.toUpperCase();
});

app.use((req, res, next) => {
  let now = new Date().toString();
  let log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', err => {
    if(err) {
      console.log(err);
    }
  });
  next();
});

app.use((req, res, next) => {
  res.render('maintenance');
});

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.render('home', {
    pageTitle: 'Home page',
    welcome: 'Welcome to my website',
    currentYear: new Date().getFullYear()
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    pageTitle: 'About Page',
    currentYear: new Date().getFullYear()
  });
});

app.get('/bad', (req, res) => {
  res.send({
    message: 'Something went wrong. Unable to fullfil the request.'
  });
});
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});