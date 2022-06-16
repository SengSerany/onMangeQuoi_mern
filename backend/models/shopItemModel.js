const mongoose = require('mongoose');

const ShopItemSchema = new mongoose.Schema(
  {
    shoppingListID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'ShoppingList',
    },
    shopItemName: {
      type: String,
      required: [true, 'You must add a name to the shopping item'],
    },
    shopItemType: {
      type: String,
      required: [true, 'You must add a quantity of the shopping item'],
    },
    shopItemQuantity: {
      type: Number,
      required: [true, 'You must add a quantity of the shopping item'],
    },
    shopItemUnit: {
      type: String,
      required: [true, 'You must add a unit of the shopping item'],
    },
    isShopped: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('ShopItem', ShopItemSchema);
