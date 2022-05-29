import axios from 'axios'
import authHeader from './auth-header.js'

const API_URL = 'http://localhost:8000/api/'

class GroupService {
  getAllGroups() {
    try {
      return axios.get(API_URL + 'groups', { headers: authHeader() }).then((response) => {
        return response.data
      })
    } catch (error) {
      throw error
    }
  }
  createGroup(data) {
    try {
      return axios.post(API_URL + 'groups', { ...data }, { headers: authHeader() }).then((response) => {
        return response.data
      })
    } catch (error) {
      throw error
    }
  }
}

export default new GroupService()
