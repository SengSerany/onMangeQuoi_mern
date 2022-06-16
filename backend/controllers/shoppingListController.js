const asyncHandler = require('express-async-handler');
const ShoppingList = require('../models/shoppingListModel');

// Index
const indexShoppingLists = asyncHandler(async (req, res) => {
  const shoppingLists = await ShoppingList.find({ authID: req.user._id });
  res.status(200).json({ endpoint: 'index shopping list', shoppingLists });
});

// Show
const showShoppingList = asyncHandler(async (req, res) => {
  const currentShoppinglist = await ShoppingList.findById(req.params.id);
  if (currentShoppinglist.authID.toString() === req.user._id.toString()) {
    res
      .status(200)
      .json({ entre_point: 'Show shopping list', currentShoppinglist });
  } else {
    res.redirect('/api/v1/shopping-list/?list=false');
  }
});

// New
const newShoppingList = asyncHandler(async (req, res) => {
  res.status(200).json({ endpoint: 'new shopping list' });
});

// Create
const createShoppingList = asyncHandler(async (req, res) => {
  const { shoppingListName } = req.body;
  if (!shoppingListName) {
    res.status(400);
    throw new Error('A name for the shopping list must be assign');
  }

  const shoppingList = await ShoppingList.create({
    shoppingListName,
    authID: req.user._id,
  });

  res.status(200).json({ endpoint: 'create shopping list', shoppingList });
});

// Edit
const editShoppingList = asyncHandler(async (req, res) => {
  const currentShoppinglist = await ShoppingList.findById(req.params.id);
  if (currentShoppinglist.authID.toString() === req.user._id.toString()) {
    res
      .status(200)
      .json({ entre_point: 'Edit shopping list', currentShoppinglist });
  } else {
    res.redirect('/api/v1/shopping-list/?list=false');
  }
});

// Update
const updateShoppingList = asyncHandler(async (req, res) => {
  const currentShoppingList = await ShoppingList.findById(req.params.id);
  if (currentShoppingList.authID.toString() === req.user._id.toString()) {
    const updatedShoppingList = await ShoppingList.findByIdAndUpdate(
      currentShoppingList._id,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json({
      entre_point: 'Update shopping list',
      updatedShoppingList,
    });
  } else {
    res.redirect('/api/v1/shopping-list/?list=false');
  }
});

// Delete
const deleteShoppingList = asyncHandler(async (req, res) => {
  const currentShoppinglist = await ShoppingList.findById(req.params.id);
  if (currentShoppinglist.authID.toString() === req.user._id.toString()) {
    currentShoppinglist.remove();

    res.status(200).json({
      entre_point: 'Delete shopping list',
      id: currentShoppinglist._id,
      name: currentShoppinglist.shoppingListName,
    });
  } else {
    res.redirect('/api/v1/shopping-list/?list=false');
  }
});

module.exports = {
  indexShoppingLists,
  newShoppingList,
  createShoppingList,
  editShoppingList,
  updateShoppingList,
  deleteShoppingList,
  showShoppingList,
};
