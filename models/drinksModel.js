const mongoose = require('mongoose');

// Schema

const drinksSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: [true, 'A drink must have name!'],
    trim: true,
  },
  id: {
    type: Number,
    unique: true,
    required: [true, 'Drink must have id'],
  },
  price: {
    type: Number,
    required: [true, 'A drink must have price!'],
  },
  type: {
    type: String,
    required: [true, 'A drink must have type!'],
  },
  variant: {
    type: String,
    required: [true, 'A drink must have variant!'],
  },
  flavor: {
    type: String,
    required: [true, 'A drink must have flavour!'],
  },
  color: {
    type: String,
    required: [true, 'A drink must have color!'],
  },
  slug: {
    type: String,
    unique: true,
    required: [true, 'A drink must have price'],
  },
  desc: {
    type: String,
    trim: true,
  },
  img: {
    type: String,
    required: [true, 'A drink must have some img!'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false, // We can't see this field now
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

// Creating the drink model out of schema

const Drink = mongoose.model('Drink', drinksSchema);

module.exports = Drink;
