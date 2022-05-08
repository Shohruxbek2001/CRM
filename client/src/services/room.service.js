import axios from 'axios';
import authHeader from './auth-header.js';

const API_URL = 'http://localhost:8000/api/';

class RoomService {
    getAllRooms() {
        return axios.get(API_URL + 'rooms', {headers: authHeader()}).then(response => {
            return response.data;
        });
    }

    createRoom(data) {
        return axios.post(API_URL + 'rooms', {...data}, {headers: authHeader()}).then(response => {
                return response.data
            }
        )
    }
}

export default new RoomService();