import axios from 'axios'
import authHeader from './auth-header.js'

const API_URL = 'http://localhost:8000/api/'

class PriceService {
  getAllPrices() {
    try {
      return axios.get(API_URL + 'prices', { headers: authHeader() }).then((response) => {
        return response.data
      })
    } catch (error) {
      throw error
    }
  }

  createPrice(data) {
    try {
      return axios.post(API_URL + 'prices', { ...data }, { headers: authHeader() }).then((response) => {
        return response.data
      })
    } catch (error) {
      throw error
    }
  }
}

export default new PriceService()
