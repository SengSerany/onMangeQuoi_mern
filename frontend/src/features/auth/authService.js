import axios from 'axios';

const API_URL = '/api/v1/auth';

// Register user
const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  console.log(response);
  console.log(userData);
  return response.data;
};

// Login
const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  return response.data;
};

// Log out
const logout = async () => {
  const response = await axios.delete(`${API_URL}/logout`);
  return response.data;
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
