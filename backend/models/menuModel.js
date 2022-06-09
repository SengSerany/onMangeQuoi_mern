const mongoose = require('mongoose');

const MenuSchema = new mongoose.Schema(
  {
    authID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Auth',
    },
    menuName: {
      type: String,
      required: [true, 'You must add a name to the menu'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Menu', MenuSchema);
