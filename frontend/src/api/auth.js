import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

// Register Function
export const registerUser = async (userData) => {
  return await axios.post(`${API_URL}/register`, userData);
};

// Login Function
export const loginUser = async (userData) => {
  return await axios.post("http://localhost:5000/api/auth/login", userData);
};
