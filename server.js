// In here you should have all the connection with the servers
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' }); // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const mongoose = require('mongoose');
const app = require('./app');

// Connecting Node.js with DB
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful!'));

// Connecting Node.js Server
const port = process.env.PORT;

app.listen(port);
