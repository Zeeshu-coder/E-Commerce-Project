import axios from 'axios';
import AuthService from './auth.service';
import { API_BASE_URL } from '../config';

const API_URL = `${API_BASE_URL}/products`;

// Add auth header helper
const authHeader = () => {
  const user = AuthService.getCurrentUser();
  if (user && user.token) {
    return { Authorization: 'Bearer ' + user.token };
  } else {
    return {};
  }
};

const getAllProducts = () => {
  return axios.get(API_URL, { headers: authHeader() });
};

const getProductById = (id) => {
  return axios.get(API_URL + '/' + id, { headers: authHeader() });
};

const searchProducts = (query) => {
  return axios.get(API_URL + '/search?query=' + query, { headers: authHeader() });
};

const createProduct = (product) => {
  return axios.post(API_URL, product, { headers: authHeader() });
};

const updateProduct = (id, product) => {
  return axios.put(API_URL + '/' + id, product, { headers: authHeader() });
};

const deleteProduct = (id) => {
  return axios.delete(API_URL + '/' + id, { headers: authHeader() });
};

const ProductService = {
  getAllProducts,
  getProductById,
  searchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};

export default ProductService;
