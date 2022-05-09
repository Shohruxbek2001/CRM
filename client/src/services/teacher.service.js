import axios from 'axios';
import authHeader from './auth-header.js';

const API_URL = 'http://localhost:8000/api/';

class TeacherService {
    getAllTeachers() {
        return axios.get(API_URL + 'teachers', {headers: authHeader()}).then(response => {
            return response.data;
        });
    }

    createTeacher(data) {
        return axios.post(API_URL + 'teachers', {...data}, {headers: authHeader()}).then(response => {
                return response.data
            }
        )
    }
}

export default new TeacherService();