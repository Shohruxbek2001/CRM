import axios from 'axios';
import authHeader from './auth-header.js';

const API_URL = 'http://localhost:8000/api/';

class GroupService {
    getAllGroups() {
        return axios.get(API_URL + 'groups', {headers: authHeader()}).then(response => {
            return response.data;
        });
    }
}

export default new GroupService();