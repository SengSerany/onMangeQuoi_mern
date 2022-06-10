const asyncHandler = require('express-async-handler');
const Dish = require('../models/dishModel');
const Menu = require('../models/menuModel');
const MenuOfDish = require('../models/menuOfDishModel');

// Create
const createMenuOfDish = asyncHandler(async (req, res) => {
  const { menuID } = req.body;
  const currentMenu = await Menu.findById(menuID);

  if (currentMenu.authID.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized to create this object');
  }

  const newMenuOfDish = await MenuOfDish.create(req.body);
  res.status(200).json({ entryPoint: 'Add dish in menu', dish: newMenuOfDish });
});

// Update
const updateMenuOfDish = asyncHandler(async (req, res) => {
  const currentMenuOfDish = await MenuOfDish.findById(req.params.id);
  const authMenu = await Menu.findById(currentMenuOfDish.menuID);
  if (authMenu.authID.toString() === req.user._id.toString()) {
    const updatedMenuOfDish = await MenuOfDish.findByIdAndUpdate(
      currentMenuOfDish._id,
      req.body,
      {
        new: true,
      }
    );
    res
      .status(200)
      .json({ entre_point: 'Update dish in menu', updatedMenuOfDish });
  } else {
    res.redirect('/api/v1/menu-of-dish/?menu-of-dish=false');
  }
});

// Delete
const deleteMenuOfDish = asyncHandler(async (req, res) => {
  const currentMenuOfDish = await MenuOfDish.findById(req.params.id);
  const currentDish = await Dish.findById(currentMenuOfDish.dishID);
  const currentMenu = await Menu.findById(currentMenuOfDish.menuID);
  const authMenu = await Menu.findById(currentMenuOfDish.menuID);
  if (authMenu.authID.toString() === req.user._id.toString()) {
    currentMenuOfDish.remove();
    res.status(200).json({
      entre_point: 'Delete dish in menu',
      id: currentMenuOfDish._id,
      dishName: currentDish.name,
      menuName: currentMenu.menuName,
    });
  } else {
    res.redirect('/api/v1/menu-of-dish/?menu-of-dish=false');
  }
});

module.exports = {
  createMenuOfDish,
  updateMenuOfDish,
  deleteMenuOfDish,
};
