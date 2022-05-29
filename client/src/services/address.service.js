import axios from 'axios'
import authHeader from './auth-header.js'

const API_URL = 'http://localhost:8000/api/'

class AddressService {
  getAllAddress() {
    try {
      return axios.get(API_URL + 'address', { headers: authHeader() }).then((response) => {
        return response.data
      })
    } catch (error) {
      throw error
    }
  }

  createAddress(data) {
    try {
      return axios.post(API_URL + 'address', { ...data }, { headers: authHeader() }).then((response) => {
        return response.data
      })
    } catch (error) {
      throw error
    }
  }
}

export default new AddressService()
