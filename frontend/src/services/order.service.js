import axios from 'axios';
import AuthService from './auth.service';
import { API_BASE_URL } from '../config';

const API_URL = `${API_BASE_URL}/orders`;

const authHeader = () => {
  const user = AuthService.getCurrentUser();
  if (user && user.token) {
    return { Authorization: 'Bearer ' + user.token };
  } else {
    return {};
  }
};

const placeOrder = (shippingAddress) => {
  return axios.post(`${API_URL}/place?shippingAddress=${shippingAddress}`, {}, { headers: authHeader() });
};

const getUserOrders = () => {
  return axios.get(`${API_URL}/my-orders`, { headers: authHeader() });
};

const getAllOrders = () => {
  return axios.get(`${API_URL}/all`, { headers: authHeader() });
};

const updateOrderStatus = (orderId, status) => {
  return axios.put(`${API_URL}/${orderId}/status?status=${status}`, {}, { headers: authHeader() });
};

const OrderService = {
  placeOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus
};

export default OrderService;
