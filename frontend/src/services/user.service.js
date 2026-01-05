import axios from 'axios';
import AuthService from './auth.service';
import { API_BASE_URL } from '../config';

const API_URL = `${API_BASE_URL}/users`;

const authHeader = () => {
  const user = AuthService.getCurrentUser();
  if (user && user.token) {
    return { Authorization: 'Bearer ' + user.token };
  } else {
    return {};
  }
};

const getAllUsers = () => {
  return axios.get(API_URL, { headers: authHeader() });
};

const getUserById = (id) => {
  return axios.get(API_URL + '/' + id, { headers: authHeader() });
};

const getMyProfile = () => {
  return axios.get(API_URL + '/me', { headers: authHeader() });
};

const updateProfile = (user) => {
  return axios.put(API_URL + '/me', user, { headers: authHeader() });
};

const UserService = {
  getAllUsers,
  getUserById,
  getMyProfile,
  updateProfile,
};

export default UserService;
