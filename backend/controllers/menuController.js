const asyncHandler = require('express-async-handler');

// Index
const indexMenus = asyncHandler(async (req, res) => {
  res.status(200).json({ endpoint: 'index menu' });
});

// Show
const showMenu = asyncHandler(async (req, res) => {
  res.status(200).json({ endpoint: 'show menu' });
});

// New
const newMenu = asyncHandler(async (req, res) => {
  res.status(200).json({ endpoint: 'new menu' });
});

// Create
const createMenu = asyncHandler(async (req, res) => {
  res.status(200).json({ endpoint: 'create menu' });
});

// Edit
const editMenu = asyncHandler(async (req, res) => {
  res.status(200).json({ endpoint: 'edit menu' });
});

// Update
const updateMenu = asyncHandler(async (req, res) => {
  res.status(200).json({ endpoint: 'update menu' });
});

// Delete
const deleteMenu = asyncHandler(async (req, res) => {
  res.status(200).json({ endpoint: 'delete menu' });
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
