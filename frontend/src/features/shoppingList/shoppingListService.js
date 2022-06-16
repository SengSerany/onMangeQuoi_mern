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

// Update shoppingList
const updateShoppingLists = async (shoppingListData) => {
  const response = await axios.patch(
    `${API_URL}/${shoppingListData.shoppingListId}/edit`,
    shoppingListData
  );
  return response.data;
};

// Delete shoppingList
const deleteShoppingLists = async (shoppingListID) => {
  const response = await axios.delete(`${API_URL}/${shoppingListID}`);
  return response.data;
};

// Update shopItem state
const changeShopItemState = async (shopItem) => {
  const response = await axios.patch(
    `${API_URL}/items/${shopItem._id}`,
    shopItem
  );
  return response.data;
};

const shoppingListService = {
  getAllShoppingLists,
  createNewShoppingLists,
  updateShoppingLists,
  deleteShoppingLists,
  changeShopItemState,
};

export default shoppingListService;
