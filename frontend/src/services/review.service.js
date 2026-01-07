import axios from 'axios';
import { API_BASE_URL } from '../config';
import AuthService from './auth.service';

const API_URL = API_BASE_URL;

const getProductReviews = (productId) => {
    return axios.get(API_URL + `/reviews/product/${productId}`);
};

const addReview = (productId, rating, comment) => {
    const user = AuthService.getCurrentUser();
    return axios.post(API_URL + "/reviews/add", {
        productId,
        rating,
        comment
    }, {
        headers: {
            Authorization: `Bearer ${user.token}`
        }
    });
};

const ReviewService = {
    getProductReviews,
    addReview
};

export default ReviewService;
