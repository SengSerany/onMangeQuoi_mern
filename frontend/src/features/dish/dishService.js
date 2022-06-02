import axios from 'axios';

const API_URL = '/api/v1/dish';

// Index dishes
const getAllDishes = async () => {
  const response = await axios.get(`${API_URL}/`);
  return response.data;
};

const dishService = {
  getAllDishes,
};

export default dishService;
