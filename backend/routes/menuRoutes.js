const express = require('express');
const menuRouter = express.Router();
const { authHandler } = require('../middleware/authMiddleware');
const {
  indexMenus,
  newMenu,
  createMenu,
  editMenu,
  updateMenu,
  deleteMenu,
  showMenu,
} = require('../controllers/menuController');

menuRouter.get('/', authHandler, indexMenus);
menuRouter.get('/new', authHandler, newMenu);
menuRouter.post('/new', authHandler, createMenu);
menuRouter.get('/:id/edit', authHandler, editMenu);
menuRouter.patch('/:id/edit', authHandler, updateMenu);
menuRouter.delete('/:id', authHandler, deleteMenu);
menuRouter.get('/:id', authHandler, showMenu);

module.exports = menuRouter;
