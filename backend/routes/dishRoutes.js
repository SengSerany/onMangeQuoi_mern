const express = require('express');
const dishRouter = express.Router();
const {
  indexDishes,
  showDish,
  newDish,
  createDish,
  editDish,
  updateDish,
  deleteDish,
} = require('../controllers/dishController');

dishRouter.get('/', indexDishes);
dishRouter.get('/new', newDish);
dishRouter.post('/new', createDish);
dishRouter.get('/:id/edit', editDish);
dishRouter.patch('/:id/edit', updateDish);
dishRouter.delete('/:id', deleteDish);
dishRouter.get('/:id', showDish);

module.exports = dishRouter;
