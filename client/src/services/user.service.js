import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8000/api/';

class UserService {
  getAllAdmins() {
      return axios.get(API_URL + 'admins', { headers: authHeader() });
  }
}

export default new UserService();