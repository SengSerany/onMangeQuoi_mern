const asyncHandler = require('express-async-handler');
const Menu = require('../models/menuModel');

// Index
const indexMenus = asyncHandler(async (req, res) => {
  const menus = await Menu.find({ authID: req.user._id });
  res.status(200).json({ endpoint: 'index menu', menus });
});

// Show
const showMenu = asyncHandler(async (req, res) => {
  const currentMenu = await Menu.findById(req.params.id);
  if (currentMenu.authID.toString() === req.user._id.toString()) {
    res.status(200).json({ entre_point: 'Show menu', currentMenu });
  } else {
    res.redirect('/api/v1/menu/?menu=false');
  }
});

// New
const newMenu = asyncHandler(async (req, res) => {
  res.status(200).json({ endpoint: 'new menu' });
});

// Create
const createMenu = asyncHandler(async (req, res) => {
  const { menuName } = req.body;
  if (!menuName) {
    res.status(400);
    throw new Error('A name for menu must be assign');
  }
  const menu = await Menu.create({ menuName, authID: req.user._id });
  res.status(200).json({ endpoint: 'create menu', menu: menu });
});

// Edit
const editMenu = asyncHandler(async (req, res) => {
  const currentMenu = await Menu.findById(req.params.id);
  if (currentMenu.authID.toString() === req.user._id.toString()) {
    res.status(200).json({ entre_point: 'Edit menu', currentMenu });
  } else {
    res.redirect('/api/v1/menu/?menu=false');
  }
});

// Update
const updateMenu = asyncHandler(async (req, res) => {
  const currentMenu = await Menu.findById(req.params.id);
  if (currentMenu.authID.toString() === req.user._id.toString()) {
    const updatedMenu = await Menu.findByIdAndUpdate(
      currentMenu._id,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json({ entre_point: 'Update menu', updatedMenu });
  } else {
    res.redirect('/api/v1/menu/?menu=false');
  }
});

// Delete
const deleteMenu = asyncHandler(async (req, res) => {
  const currentMenu = await Menu.findById(req.params.id);
  if (currentMenu.authID.toString() === req.user._id.toString()) {
    currentMenu.remove();
    res.status(200).json({
      entre_point: 'Delete menu',
      id: currentMenu._id,
      name: currentMenu.menuName,
    });
  } else {
    res.redirect('/api/v1/menu/?menu=false');
  }
});

module.exports = {
  indexMenus,
  newMenu,
  createMenu,
  editMenu,
  updateMenu,
  deleteMenu,
  showMenu,
};
