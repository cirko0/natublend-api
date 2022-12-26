// In here you should have all the connection with the servers
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// All bugs in our synchronous code but are not caught anywhere
process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! Shuting down....');

  // Shuting down the app
  process.exit(1);
});

dotenv.config({ path: './config.env' }); // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
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

const server = app.listen(port);

// If the connection with DB is not possible for some reason
process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! Shuting down....');
  // Closing the server
  server.close(() => {
    // Shuting down the app
    process.exit(1);
  });
});
