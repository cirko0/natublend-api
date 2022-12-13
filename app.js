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

// Sta je ovo da me ubijes ne znam
app.use(
  cors({
    origin: function (url, callback) {
      // callback(message, enableCors)
      if (!url) return callback(null, false);

      if (allowedDomains.indexOf(url) === -1) {
        const msg = `This site ${url} does not have an access. Only specific domains are allowed to access it.`;
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
