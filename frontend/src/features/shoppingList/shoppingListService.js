import axios from 'axios';

const API_URL = '/api/v1/shopping-list';

// Index shoppingLists
const getAllShoppingLists = async () => {
  const response = await axios.get(`${API_URL}/`);
  return response.data;
};

// Create shoppingList
const createNewShoppingLists = async (shoppingListData) => {
  const response = await axios.post(`${API_URL}/new`, shoppingListData);
  return response.data;
};

const shoppingListService = {
  getAllShoppingLists,
  createNewShoppingLists,
};

export default shoppingListService;
