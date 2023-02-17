// In here you should have all the callbacks for the routes

const Drink = require('../models/drinksModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
// Get all drinks

//ALIAS

exports.aliasTopDrinks = catchAsync(async (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = 'price';

  next();
});

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

exports.getAllDrinks = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Drink.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  // Executing the query

  const data = await features.query;

  res.status(200).json({
    status: 'success',
    results: data.length,
    data,
  });
});

// Create drink

exports.createDrink = catchAsync(async (req, res, next) => {
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // In here we apply all methods on the Drink model directly
  const data = await Drink.create(req.body);
  res.status(201).json({
    status: 'success',
    newData: { data },
  });
});

exports.getDrink = catchAsync(async (req, res, next) => {
  const data = await Drink.findById(req.params.id);

  // HANDLING NOT FOUND ERRORS
  if (!data) {
    return next(new AppError('No drink found with that ID', 404));
  }

  res.status(201).json({
    status: 'success',
    data,
  });
});

// Update drink

exports.updateDrink = catchAsync(async (req, res, next) => {
  const data = await Drink.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true, //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  });

  // HANDLING NOT FOUND ERRORS
  if (!data) {
    return next(new AppError('No drink found with that ID', 404));
  }

  res.status(201).json({
    status: 'success',
    message: 'Drink successfuly updated!',
    updatedDrink: { data },
  });
});

// Delete drink

exports.deleteDrink = catchAsync(async (req, res, next) => {
  const data = await Drink.findByIdAndDelete(req.params.id);

  // HANDLING NOT FOUND ERRORS
  if (!data) {
    return next(new AppError('No drink found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.getDrinkStats = catchAsync(async (req, res, next) => {
  const stats = await Drink.aggregate([
    {
      $match: {},
    },
    {
      $group: {},
    },
  ]);
  res.status(200).json({
    status: 'success',
    data: {
      stats,
    },
  });
});
