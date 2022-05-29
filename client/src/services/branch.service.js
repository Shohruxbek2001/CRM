import axios from 'axios'
import authHeader from './auth-header.js'

const API_URL = 'http://localhost:8000/api/'

class BranchService {
  getAllBranches() {
    try {
      return axios.get(API_URL + 'branches', { headers: authHeader() }).then((response) => {
        return response.data
      })
    } catch (error) {
      throw error
    }
  }

  createBranch(data) {
    try {
      return axios.post(API_URL + 'branches', { ...data }, { headers: authHeader() }).then((response) => {
        return response.data
      })
    } catch (error) {
      throw error
    }
  }
}

export default new BranchService()
