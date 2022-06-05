import axios from 'axios'
import authHeader from './auth-header.js'

const API_URL = 'http://localhost:8000/api/'

class AdminService {
  getAllAdmins() {
    try {
      return axios.get(API_URL + 'admins', { headers: authHeader() }).then((response) => {
        return response.data
      })
    } catch (error) {
      throw error
    }
  }

  createAdmin(data) {
    try {
      return axios.post(API_URL + 'admins', { ...data }, { headers: authHeader() }).then((response) => {
        return response.data
      })
    } catch (error) {
      throw error
    }
  } 

  deleteAdmin(data) {
    try {
      return axios.delete(API_URL + 'admins/' + data, { headers: authHeader() }).then((response) => {
        return response.data
      })
    } catch (error) {
      throw error
    }
  } 
}

export default new AdminService()
