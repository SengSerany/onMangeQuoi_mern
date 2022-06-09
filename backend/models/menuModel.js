const mongoose = require('mongoose');

const MenuSchema = new mongoose.Schema(
  {
    menuName: {
      type: String,
      required: [true, 'You must add a name to the menu'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Menu', MenuSchema);
