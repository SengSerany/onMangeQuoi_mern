const asyncHandler = require('express-async-handler');

// Index
const indexDishes = asyncHandler(async (req, res) => {
  res.status(200).json({ entre_point: 'Index dishes' });
});

// Show
const showDish = asyncHandler(async (req, res) => {
  res.status(200).json({ entre_point: 'Show dish' });
});

// New
const newDish = asyncHandler(async (req, res) => {
  res.status(200).json({ entre_point: 'New dish' });
});

// Create
const createDish = asyncHandler(async (req, res) => {
  if (!req.body.dish) {
    res.status(400);
    throw new Error('All field must be completed');
  }
  res.status(200).json({ entre_point: 'Create dish' });
});

// Edit
const editDish = asyncHandler(async (req, res) => {
  res.status(200).json({ entre_point: 'Edit dish' });
});

// Update
const updateDish = asyncHandler(async (req, res) => {
  res.status(200).json({ entre_point: 'Update dish' });
});

// Delete
const deleteDish = asyncHandler(async (req, res) => {
  res.status(200).json({ entre_point: 'Delete dish' });
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
