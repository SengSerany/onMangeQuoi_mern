const mongoose = require('mongoose');

const MenuOfDishSchema = new mongoose.Schema(
  {
    menuID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Menu',
    },
    dishID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Dish',
    },
    forNbPeople: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('MenuOfDish', MenuOfDishSchema);
