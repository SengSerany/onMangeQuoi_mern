// Index
const indexDishes = (req, res) => {
  res.status(200).json({ entre_point: 'Index dishes' });
};

// Show
const showDish = (req, res) => {
  res.status(200).json({ entre_point: 'Show dish' });
};

// New
const newDish = (req, res) => {
  res.status(200).json({ entre_point: 'New dish' });
};

// Create
const createDish = (req, res) => {
  res.status(200).json({ entre_point: 'Create dish' });
};

// Edit
const editDish = (req, res) => {
  res.status(200).json({ entre_point: 'Edit dish' });
};

// Update
const updateDish = (req, res) => {
  res.status(200).json({ entre_point: 'Update dish' });
};

// Delete
const deleteDish = (req, res) => {
  res.status(200).json({ entre_point: 'Delete dish' });
};

module.exports = {
  indexDishes,
  showDish,
  newDish,
  createDish,
  editDish,
  updateDish,
  deleteDish,
};
