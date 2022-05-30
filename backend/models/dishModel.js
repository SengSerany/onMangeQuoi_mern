const mongoose = require('mongoose');

const DishSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    ingredients: [
      {
        name: {
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