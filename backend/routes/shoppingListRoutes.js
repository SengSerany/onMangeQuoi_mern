const express = require('express');
const shoppingListRouter = express.Router();
const { authHandler } = require('../middleware/authMiddleware');
const {
  indexShoppingLists,
  newShoppingList,
  createShoppingList,
  editShoppingList,
  updateShoppingList,
  deleteShoppingList,
  showShoppingList,
} = require('../controllers/shoppingListController');

shoppingListRouter.get('/', authHandler, indexShoppingLists);
shoppingListRouter.get('/new', authHandler, newShoppingList);
shoppingListRouter.post('/new', authHandler, createShoppingList);
shoppingListRouter.get('/:id/edit', authHandler, editShoppingList);
shoppingListRouter.patch('/:id/edit', authHandler, updateShoppingList);
shoppingListRouter.delete('/:id', authHandler, deleteShoppingList);
shoppingListRouter.get('/:id', authHandler, showShoppingList);

module.exports = shoppingListRouter;
