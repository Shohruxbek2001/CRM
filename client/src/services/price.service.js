import axios from 'axios'
import authHeader from './auth-header.js'

const API_URL = 'http://localhost:8000/api/'

class PriceService {
  getAllPrices() {
    return axios.get(API_URL + 'prices', { headers: authHeader() }).then((response) => {
      return response.data
    })
  }

  createPrice(data) {
    return axios.post(API_URL + 'prices', { ...data }, { headers: authHeader() }).then((response) => {
      return response.data
    })
  }
}

export default new PriceService()
