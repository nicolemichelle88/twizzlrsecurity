const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', './views'); // Ensure this points to the correct directory

// Serve static files
app.use(express.static('public'));

let isAuthenticated = false;

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  console.log(`Login attempt with username: ${username} and password: ${password}`); // Log credentials (for debugging purposes)

  if (username === 'admin' && password === 'password') {
    isAuthenticated = true;
    console.log('Login successful');
    res.redirect('/dashboard');
  } else {
    console.log('Login failed');
    res.redirect('/login');
  }
});

app.get('/dashboard', (req, res) => {
  if (isAuthenticated) {
    res.render('dashboard');
  } else {
    res.redirect('/login');
  }
});

app.get('/alerts', (req, res) => {
  if (isAuthenticated) {
    res.render('alerts');
  } else {
    res.redirect('/login');
  }
});

app.listen(port, () => {
  console.log(`Twizzlr Security app listening at http://localhost:${port}`);
});
