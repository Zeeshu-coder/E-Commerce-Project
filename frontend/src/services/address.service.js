import axios from 'axios';
import { API_BASE_URL } from '../config';
import AuthService from './auth.service';

const API_URL = API_BASE_URL;

const getUserAddresses = () => {
    const user = AuthService.getCurrentUser();
    return axios.get(API_URL + "/addresses", {
        headers: {
            Authorization: `Bearer ${user.token}`
        }
    });
};

const addAddress = (address) => {
    const user = AuthService.getCurrentUser();
    return axios.post(API_URL + "/addresses", address, {
        headers: {
            Authorization: `Bearer ${user.token}`
        }
    });
};

const deleteAddress = (addressId) => {
    const user = AuthService.getCurrentUser();
    return axios.delete(API_URL + `/addresses/${addressId}`, {
        headers: {
            Authorization: `Bearer ${user.token}`
        }
    });
};

const AddressService = {
    getUserAddresses,
    addAddress,
    deleteAddress
};

export default AddressService;
