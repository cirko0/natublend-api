// In here you should have all the callbacks for the routes

const Drink = require('../models/drinksModel');

// Get all drinks

exports.getAllDrinks = async function (req, res) {
  try {
    // 1) Filtering
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];

    // We must do this before filtering always
    excludedFields.forEach(el => delete queryObj[el]); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    // 2) Advanced filtering  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    let queryStr = JSON.stringify(queryObj);

    // Regular expression (just find them on google)
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    let query = Drink.find(JSON.parse(queryStr)); // Find returns the query

    // 3) Sorting //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! // sort('price createdAt slug')
    } else {
      query = query.sort('-createdAt');
    }

    // 4) Field limiting //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! // select('price createdAt slug color')
    } else {
      query = query.select('-__v'); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    }

    // 5) Pagination  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1

    if (req.query.page) {
      const numDrinks = await Drink.countDocuments(); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1
      if (skip >= numDrinks) throw new Error('This page does not exist');
    }

    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // Executing the query
    const data = await query;

    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    res.status(200).json({
      status: 'success',
      results: data.length,
      data,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

// Create drink

exports.createDrink = async (req, res) => {
  try {
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // In here we apply all methods on the Drink model directly
    const data = await Drink.create(req.body);
    res.status(201).json({
      status: 'success',
      newData: { data },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getDrink = async (req, res) => {
  try {
    const data = await Drink.findById(req.params.id);
    res.status(201).json({
      status: 'success',
      data,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

// Update drink

exports.updateDrink = async (req, res) => {
  try {
    const data = await Drink.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true, //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    });

    res.status(201).json({
      status: 'success',
      message: 'Drink successfuly updated!',
      updatedDrink: { data },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

// Delete drink

exports.deleteDrink = async (req, res) => {
  try {
    await Drink.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
