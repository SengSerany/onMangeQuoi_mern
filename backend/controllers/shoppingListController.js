const asyncHandler = require('express-async-handler');
const ShoppingList = require('../models/shoppingListModel');
const ShopItem = require('../models/shopItemModel');

// Index
const indexShoppingLists = asyncHandler(async (req, res) => {
  const shoppingLists = await ShoppingList.find({ authID: req.user._id });

  const mapShopItemsUser = async () => {
    let itemsList = [];

    for (let i = 0; i < shoppingLists.length; i++) {
      const currentListItems = await ShopItem.find({
        shoppingListID: shoppingLists[i]._id,
      });
      if (currentListItems.length > 0) {
        itemsList.push(...currentListItems);
      }
    }

    return itemsList;
  };

  const AllItemsList = await mapShopItemsUser();

  res.status(200).json({
    endpoint: 'index shopping list',
    shoppingLists,
    itemsList: AllItemsList,
  });
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
  let shopItemsList = [];
  const { shoppingListName, items } = req.body;
  if (!shoppingListName) {
    res.status(400);
    throw new Error('A name for the shopping list must be assign');
  }

  const shoppingList = await ShoppingList.create({
    shoppingListName,
    authID: req.user._id,
  });

  if (items) {
    for (let i = 0; i < items.length; i++) {
      const shopItem = await ShopItem.create({
        shoppingListID: shoppingList._id,
        shopItemType: items[i].shopItemType,
        shopItemName: items[i].shopItemName,
        shopItemQuantity: items[i].shopItemQuantity,
        shopItemUnit: items[i].shopItemUnit,
      });
      shopItemsList.push(shopItem);
    }
  }

  res.status(200).json({
    endpoint: 'create shopping list',
    shoppingList,
    itemsList: shopItemsList,
  });
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
  let shopItemsList = [];
  const { items } = req.body;

  const currentShoppingList = await ShoppingList.findById(req.params.id);
  if (currentShoppingList.authID.toString() === req.user._id.toString()) {
    const updatedShoppingList = await ShoppingList.findByIdAndUpdate(
      currentShoppingList._id,
      req.body,
      {
        new: true,
      }
    );

    if (items) {
      await ShopItem.deleteMany({ shoppingListID: currentShoppingList._id });

      for (let i = 0; i < items.length; i++) {
        const shopItem = await ShopItem.create({
          shoppingListID: currentShoppingList._id,
          shopItemType: items[i].shopItemType,
          shopItemName: items[i].shopItemName,
          shopItemQuantity: items[i].shopItemQuantity,
          shopItemUnit: items[i].shopItemUnit,
        });
        shopItemsList.push(shopItem);
      }
    }

    res.status(200).json({
      entre_point: 'Update shopping list',
      updatedShoppingList,
      itemsList: shopItemsList,
    });
  } else {
    res.redirect('/api/v1/shopping-list/?list=false');
  }
});

// Delete
const deleteShoppingList = asyncHandler(async (req, res) => {
  const currentShoppinglist = await ShoppingList.findById(req.params.id);
  if (currentShoppinglist.authID.toString() === req.user._id.toString()) {
    await ShopItem.deleteMany({ shoppingListID: currentShoppinglist._id });
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

const updateShopItems = asyncHandler(async (req, res) => {
  const currentShopItem = await ShopItem.findById(req.params.id);
  const currentShoppinglist = await ShoppingList.findById(
    currentShopItem.shoppingListID
  );
  if (currentShoppinglist.authID.toString() === req.user._id.toString()) {
    const updatedShopItem = await ShopItem.findByIdAndUpdate(
      currentShopItem._id,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json({
      entre_point: 'Update shop item',
      updatedShopItem,
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
  updateShopItems,
};
