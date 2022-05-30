const express = require('express');
const dishRouter = express.Router();
const { authHandler } = require('../middleware/authMiddleware');
const {
  indexDishes,
  showDish,
  newDish,
  createDish,
  editDish,
  updateDish,
  deleteDish,
} = require('../controllers/dishController');

dishRouter.get('/', authHandler, indexDishes);
dishRouter.get('/new', authHandler, newDish);
dishRouter.post('/new', authHandler, createDish);
dishRouter.get('/:id/edit', authHandler, editDish);
dishRouter.patch('/:id/edit', authHandler, updateDish);
dishRouter.delete('/:id', authHandler, deleteDish);
dishRouter.get('/:id', authHandler, showDish);

module.exports = dishRouter;
