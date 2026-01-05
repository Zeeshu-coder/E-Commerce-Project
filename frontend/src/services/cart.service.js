import axios from 'axios';
import AuthService from './auth.service';
import { API_BASE_URL } from '../config';

const API_URL = `${API_BASE_URL}/cart`;

const authHeader = () => {
  const user = AuthService.getCurrentUser();
  if (user && user.token) {
    return { Authorization: 'Bearer ' + user.token };
  } else {
    return {};
  }
};

const getCart = () => {
  return axios.get(API_URL, { headers: authHeader() });
};

const addToCart = (productId, quantity) => {
  return axios.post(`${API_URL}/add?productId=${productId}&quantity=${quantity}`, {}, { headers: authHeader() });
};

const removeFromCart = (productId) => {
  return axios.delete(`${API_URL}/remove/${productId}`, { headers: authHeader() });
};

const updateQuantity = (productId, quantity) => {
  return axios.put(`${API_URL}/update?productId=${productId}&quantity=${quantity}`, {}, { headers: authHeader() });
};

const CartService = {
  getCart,
  addToCart,
  removeFromCart,
  updateQuantity
};

export default CartService;
