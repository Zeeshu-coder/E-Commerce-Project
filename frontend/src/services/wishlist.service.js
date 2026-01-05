import axios from 'axios';
import AuthService from './auth.service';
import { API_BASE_URL } from '../config';

const API_URL = `${API_BASE_URL}/wishlist`;

const authHeader = () => {
  const user = AuthService.getCurrentUser();
  if (user && user.token) {
    return { Authorization: 'Bearer ' + user.token };
  } else {
    return {};
  }
};

const getWishlist = () => {
  return axios.get(API_URL, { headers: authHeader() });
};

const addToWishlist = (productId) => {
  return axios.post(`${API_URL}/add/${productId}`, {}, { headers: authHeader() });
};

const removeFromWishlist = (productId) => {
  return axios.delete(`${API_URL}/remove/${productId}`, { headers: authHeader() });
};

const WishlistService = {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
};

export default WishlistService;
