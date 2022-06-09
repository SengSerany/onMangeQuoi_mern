import axios from 'axios';

const API_URL = '/api/v1/dish';

// Index dishes
const getAllDishes = async () => {
  const response = await axios.get(`${API_URL}/`);
  return response.data;
};

// Create dish
const createNewDishes = async (dishData) => {
  const response = await axios.post(`${API_URL}/new`, dishData);
  return response.data;
};

// Update dish
const updateDishes = async (dishData) => {
  const response = await axios.patch(
    `${API_URL}/${dishData.dishId}/edit`,
    dishData
  );
  return response.data;
};

// Delete dish
const deleteDishes = async (dishID) => {
  const response = await axios.delete(`${API_URL}/${dishID}`);
  return response.data;
};

const dishService = {
  getAllDishes,
  createNewDishes,
  updateDishes,
  deleteDishes,
};

export default dishService;
