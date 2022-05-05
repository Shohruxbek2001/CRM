import axios from 'axios';
import authHeader from './auth-header.js';

const API_URL = 'http://localhost:8000/api/';

class StudentService {
    getAllStudents() {
        return axios.get(API_URL + 'users', {headers: authHeader()}).then(response => {
            return response.data;
        });
    }

    createStudent(data) {
        return axios.post(API_URL + 'users', {...data}, {headers: authHeader()}).then(response => {
                return response.data
            }
        )
    }
}

export default new StudentService();