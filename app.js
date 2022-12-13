const cors = require('cors'); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const express = require('express');
const drinkRouter = require('./routes/drinkRoutes');

const app = express();
app.use(express.json()); // VERY IMPORTANT

// API open for all users
// Omogucavam odredjenom hostu da uzima podatke iz baze
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

const allowedDomains = [
  'http://localhost:5173',
  'https://natublend.netlify.app',
];
app.use(
  cors({
    origin: function (origin, callback) {
      // bypass the requests with no origin (like curl requests, mobile apps, etc )
      if (!origin) return callback(null, true);

      if (allowedDomains.indexOf(origin) === -1) {
        const msg = `This site ${origin} does not have an access. Only specific domains are allowed to access it.`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);

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
