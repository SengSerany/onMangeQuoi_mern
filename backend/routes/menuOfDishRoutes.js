const express = require('express');
const menuOfDishRouter = express.Router();
const { authHandler } = require('../middleware/authMiddleware');
const {
  createMenuOfDish,
  updateMenuOfDish,
  deleteMenuOfDish,
} = require('../controllers/menuOfDishController');

menuOfDishRouter.post('/new', authHandler, createMenuOfDish);
menuOfDishRouter.patch('/:id/edit', authHandler, updateMenuOfDish);
menuOfDishRouter.delete('/:id', authHandler, deleteMenuOfDish);

module.exports = menuOfDishRouter;
