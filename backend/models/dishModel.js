const mongoose = require('mongoose');

const DishSchema = new mongoose.Schema(
  {
    authID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Auth',
    },
    name: {
      type: String,
      required: true,
    },
    ingredients: [
      {
        ingredientName: {
          type: String,
          require: true,
        },
        quantity: {
          type: Number,
        },
        unit: {
          type: String,
        },
      },
    ],
    forPeopleNumber: {
      type: Number,
      required: true,
    },
    recipe: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Dish', DishSchema);
