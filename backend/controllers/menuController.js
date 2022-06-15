const asyncHandler = require('express-async-handler');
const Menu = require('../models/menuModel');
const MenuOfDish = require('../models/menuOfDishModel');

// Index
const indexMenus = asyncHandler(async (req, res) => {
  const menus = await Menu.find({ authID: req.user._id });

  const mapLinksMenuDish = async () => {
    let linksMenuDish = [];

    for (let i = 0; i < menus.length; i++) {
      const currentMenuOfDish = await MenuOfDish.find({ menuID: menus[i]._id });
      if (currentMenuOfDish.length > 0) {
        linksMenuDish.push(...currentMenuOfDish);
      }
    }

    return linksMenuDish;
  };

  const menusOfDishes = await mapLinksMenuDish();

  res.status(200).json({ endpoint: 'index menu', menus, menusOfDishes });
});

// Show
const showMenu = asyncHandler(async (req, res) => {
  const currentMenu = await Menu.findById(req.params.id);
  if (currentMenu.authID.toString() === req.user._id.toString()) {
    res.status(200).json({ entre_point: 'Show menu', currentMenu });
  } else {
    res.redirect('/api/v1/menu/?menu=false');
  }
});

// New
const newMenu = asyncHandler(async (req, res) => {
  res.status(200).json({ endpoint: 'new menu' });
});

// Create
const createMenu = asyncHandler(async (req, res) => {
  let linksMenuDish = [];
  const { menuName, addedDishesID, addedDishesPeopleNb } = req.body;
  if (!menuName) {
    res.status(400);
    throw new Error('A name for menu must be assign');
  }

  const menu = await Menu.create({ menuName, authID: req.user._id });

  if (addedDishesID) {
    for (let i = 0; i < addedDishesID.length; i++) {
      const setDishInMenu = await MenuOfDish.create({
        menuID: menu._id,
        dishID: addedDishesID[i],
        forNbPeople: addedDishesPeopleNb[i],
      });
      linksMenuDish.push(setDishInMenu);
    }
  }

  res
    .status(200)
    .json({ endpoint: 'create menu', menu: menu, setDishes: linksMenuDish });
});

// Edit
const editMenu = asyncHandler(async (req, res) => {
  const currentMenu = await Menu.findById(req.params.id);
  if (currentMenu.authID.toString() === req.user._id.toString()) {
    res.status(200).json({ entre_point: 'Edit menu', currentMenu });
  } else {
    res.redirect('/api/v1/menu/?menu=false');
  }
});

// Update
const updateMenu = asyncHandler(async (req, res) => {
  let linksMenuDish = [];
  const { addedDishesID, addedDishesPeopleNb } = req.body;
  const currentMenu = await Menu.findById(req.params.id);
  if (currentMenu.authID.toString() === req.user._id.toString()) {
    const updatedMenu = await Menu.findByIdAndUpdate(
      currentMenu._id,
      req.body,
      {
        new: true,
      }
    );

    if (addedDishesID) {
      await MenuOfDish.deleteMany({ menuID: currentMenu._id });

      for (let i = 0; i < addedDishesID.length; i++) {
        const setDishInMenu = await MenuOfDish.create({
          menuID: currentMenu._id,
          dishID: addedDishesID[i],
          forNbPeople: addedDishesPeopleNb[i],
        });
        linksMenuDish.push(setDishInMenu);
      }
    }

    res.status(200).json({
      entre_point: 'Update menu',
      updatedMenu,
      setDishes: linksMenuDish,
    });
  } else {
    res.redirect('/api/v1/menu/?menu=false');
  }
});

// Delete
const deleteMenu = asyncHandler(async (req, res) => {
  const currentMenu = await Menu.findById(req.params.id);
  if (currentMenu.authID.toString() === req.user._id.toString()) {
    await MenuOfDish.deleteMany({ menuID: currentMenu._id });
    currentMenu.remove();

    res.status(200).json({
      entre_point: 'Delete menu',
      id: currentMenu._id,
      name: currentMenu.menuName,
    });
  } else {
    res.redirect('/api/v1/menu/?menu=false');
  }
});

module.exports = {
  indexMenus,
  newMenu,
  createMenu,
  editMenu,
  updateMenu,
  deleteMenu,
  showMenu,
};
