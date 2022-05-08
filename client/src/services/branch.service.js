import axios from 'axios';
import authHeader from './auth-header.js';

const API_URL = 'http://localhost:8000/api/';

class BranchService {
    getAllBranches() {
        return axios.get(API_URL + 'branches', {headers: authHeader()}).then(response => {
            return response.data;
        });
    }

    createBranch(data) {
        return axios.post(API_URL + 'branches', {...data}, {headers: authHeader()}).then(response => {
                return response.data
            }
        )
    }
}

export default new BranchService();