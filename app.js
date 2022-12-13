const cors = require('cors'); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const express = require('express');
const drinkRouter = require('./routes/drinkRoutes');

const app = express();
app.use(express.json()); // VERY IMPORTANT

// API open for all users
// Omogucavam odredjenom hostu da uzima podatke iz baze
app.use(cors({ credentials: true, origin: 'http://localhost:5173' })); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
app.use(cors({ credentials: true, origin: 'https://natublend.netlify.app/' })); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// Adding html and css

app.get('/', (req, res) => {
  res.status(200).sendFile(`${__dirname}/index.html`);
});

app.get('/style.css', (req, res) => {
  res.sendFile(`${__dirname}/style.css`);
});

// Mounting

app.use('/api/v1/drinks', drinkRouter);

module.exports = app;
