const express = require('express')
const app = express()
const path = require('path');
const port = 3000

const dir = path.resolve('site/dist')

// all static files are served from here
app.use(express.static(dir))

// routes
app.get('/signin', function(req, res) {
  res.sendFile(path.join(dir, 'signin.html'));
});

app.get('/signup', function(req, res) {
  res.sendFile(path.join(dir, 'signup.html'));
});

app.get('/checkout', function(req, res) {
  res.sendFile(path.join(dir, 'checkout.html'));
});

app.get('/certificates/add', function(req, res) {
  res.sendFile(path.join(dir, 'add-certificate.html'));
});

app.get('/certificates/1', function(req, res) {
  res.sendFile(path.join(dir, 'certificate.html'));
});

app.get('/errors/404', function(req, res) {
  res.status(404).sendFile(path.join(dir, '404.html'));
});

// all other routes are handled by redirecting to 404
app.use(function(req, res) {
  res.redirect('/errors/404');
});

// start the server
app.listen(port, () => console.log(`App started on http://localhost:${port}`))
