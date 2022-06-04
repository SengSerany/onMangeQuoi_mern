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

const dishService = {
  getAllDishes,
  createNewDishes,
};

export default dishService;
