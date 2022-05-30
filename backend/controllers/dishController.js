const asyncHandler = require('express-async-handler');
const Dish = require('../models/dishModel');

// Index
const indexDishes = asyncHandler(async (req, res) => {
  const dishes = await Dish.find();
  res.status(200).json({ entre_point: 'Index dishes', dishes });
});

// Show
const showDish = asyncHandler(async (req, res) => {
  const currentDish = await Dish.findById(req.params.id);
  res.status(200).json({ entre_point: 'Show dish', currentDish });
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
  res.status(200).json({ entryPoint: 'create dish', ...newDish._doc });
});

// Edit
const editDish = asyncHandler(async (req, res) => {
  const currentDish = await Dish.findById(req.params.id);
  res.status(200).json({ entre_point: 'Edit dish', currentDish });
});

// Update
const updateDish = asyncHandler(async (req, res) => {
  const currentDish = await Dish.findById(req.params.id);
  const updatedDish = await Dish.findByIdAndUpdate(currentDish._id, req.body, {
    new: true,
  });
  res.status(200).json({ entre_point: 'Update dish', updatedDish });
});

// Delete
const deleteDish = asyncHandler(async (req, res) => {
  const currentDish = await Dish.findById(req.params.id);
  currentDish.remove();
  res.status(200).json({
    entre_point: 'Delete dish',
    id: currentDish._id,
    name: currentDish.name,
  });
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
