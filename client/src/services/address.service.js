import axios from 'axios';
import authHeader from './auth-header.js';

const API_URL = 'http://localhost:8000/api/';

class RegionService {
    getAllRegions() {
        return axios.get(API_URL + 'regions', {headers: authHeader()}).then(response => {
            return response.data;
        });
    }

    createRegion(data) {
        return axios.post(API_URL + 'regions', {...data}, {headers: authHeader()}).then(response => {
                return response.data
            }
        )
    }
}

export default new RegionService();