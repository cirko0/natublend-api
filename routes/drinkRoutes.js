// In here you should have all the routes

const express = require('express');
const drinkController = require('../controllers/drinkController');
 
// This is our router middlewear
const router = express.Router();

// Routing
router
  .route('/top-5-drinks')
  .get(drinkController.aliasTopDrinks, drinkController.getAllDrinks);

router
  .route('/')
  .get(drinkController.getAllDrinks)
  .post(drinkController.createDrink);

router
  .route('/:id')
  .get(drinkController.getDrink)
  .patch(drinkController.updateDrink)
  .delete(drinkController.deleteDrink);

module.exports = router;
