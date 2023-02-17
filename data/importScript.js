const fs = require('fs');
const mongoose = require('mongoose');

const dotenv = require('dotenv');
 
const Drink = require('../models/drinksModel');

dotenv.config({ path: '../config.env' });

// Create server

// Connect DB to express

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
  .then(() => {
    console.log('DB connected');
  });

// Read file

const drinks = JSON.parse(fs.readFileSync(`data.json`, 'utf-8'));

// Import that data to DB

const importData = async () => {
  try {
    await Drink.create(drinks);
    console.log('Data successfuly imported');
  } catch (err) {
    console.log(err);
  }
  process.exit(); //To exit of application
};

const deleteData = async function () {
  try {
    await Drink.deleteMany();
    console.log('Data successfuly deleted');
  } catch (err) {
    console.log(err);
  }
  process.exit(); //To exit of application
};

// !!!!!!!!!!!!!!!!!!!!!!!!!!!

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
