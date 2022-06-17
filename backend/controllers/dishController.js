const asyncHandler = require('express-async-handler');
const Dish = require('../models/dishModel');
const Menu = require('../models/menuModel');

// Index
const indexDishes = asyncHandler(async (req, res) => {
  const isDishAuth = req.query.dish;
  const dishes = await Dish.find({ authID: req.user._id });
  res.status(200).json({
    entre_point: 'Index dishes',
    auth: isDishAuth && "Couldn't found this dish",
    dishes,
  });
});

// Show
const showDish = asyncHandler(async (req, res) => {
  const currentDish = await Dish.findById(req.params.id);
  if (currentDish.authID.toString() === req.user._id.toString()) {
    res.status(200).json({ entre_point: 'Show dish', currentDish });
  } else {
    res.redirect('/api/v1/dish/?dish=false');
  }
});

// New
const newDish = asyncHandler(async (req, res) => {
  res.status(200).json({ entre_point: 'New dish' });
});

// Create
const createDish = asyncHandler(async (req, res) => {
  const currentUser = req.user;
  const newDish = await Dish.create({
    authID: currentUser._id,
    ...req.body,
  });
  res.status(200).json({ entryPoint: 'create dish', dish: newDish });
});

// Edit
const editDish = asyncHandler(async (req, res) => {
  const currentDish = await Dish.findById(req.params.id);
  if (currentDish.authID.toString() === req.user._id.toString()) {
    res.status(200).json({ entre_point: 'Edit dish', currentDish });
  } else {
    res.redirect('/api/v1/dish/?dish=false');
  }
});

// Update
const updateDish = asyncHandler(async (req, res) => {
  const currentDish = await Dish.findById(req.params.id);
  if (currentDish.authID.toString() === req.user._id.toString()) {
    const updatedDish = await Dish.findByIdAndUpdate(
      currentDish._id,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json({ entre_point: 'Update dish', updatedDish });
  } else {
    res.redirect('/api/v1/dish/?dish=false');
  }
});

// Delete
const deleteDish = asyncHandler(async (req, res) => {
  const currentDish = await Dish.findById(req.params.id);
  if (currentDish.authID.toString() === req.user._id.toString()) {
    await Menu.deleteMany({ dishID: currentDish._id });
    currentDish.remove();
    res.status(200).json({
      entre_point: 'Delete dish',
      id: currentDish._id,
      name: currentDish.name,
    });
  } else {
    res.redirect('/api/v1/dish/?dish=false');
  }
});

module.exports = {
  indexDishes,
  showDish,
  newDish,
  createDish,
  editDish,
  updateDish,
  deleteDish,
};
