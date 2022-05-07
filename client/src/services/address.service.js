import axios from 'axios';
import authHeader from './auth-header.js';

const API_URL = 'http://localhost:8000/api/';

class AddressService {
    getAllAddress() {
        return axios.get(API_URL + 'address', {headers: authHeader()}).then(response => {
            return response.data;
        });
    }

    createAddress(data) {
        return axios.post(API_URL + 'address', {...data}, {headers: authHeader()}).then(response => {
                return response.data
            }
        )
    }
}

export default new AddressService();