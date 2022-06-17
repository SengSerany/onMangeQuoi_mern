const mongoose = require('mongoose');

const ShoppingListSchema = new mongoose.Schema(
  {
    authID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Auth',
    },
    shoppingListName: {
      type: String,
      required: [true, 'You must add a name to the shopping list'],
    },
    isDone: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('ShoppingList', ShoppingListSchema);
