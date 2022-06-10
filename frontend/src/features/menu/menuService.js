import axios from 'axios';

const API_URL = '/api/v1/menu';

// Index menus
const getAllMenus = async () => {
  const response = await axios.get(`${API_URL}/`);
  return response.data;
};

// Create menu
const createNewMenus = async (menuData) => {
  const response = await axios.post(`${API_URL}/new`, menuData);
  return response.data;
};

// Update menu
const updateMenus = async (menuData) => {
  const response = await axios.patch(
    `${API_URL}/${menuData.menuId}/edit`,
    menuData
  );
  return response.data;
};

// Delete menu
const deleteMenus = async (menuID) => {
  const response = await axios.delete(`${API_URL}/${menuID}`);
  return response.data;
};

// Add dish to menu
const addDishInMenu = async (linkInfos) => {
  const response = await axios.post('/api/v1/menu-of-dish/new', linkInfos);
  console.log(response);
  return response.data;
};

const menuService = {
  getAllMenus,
  createNewMenus,
  updateMenus,
  deleteMenus,
  addDishInMenu,
};

export default menuService;
