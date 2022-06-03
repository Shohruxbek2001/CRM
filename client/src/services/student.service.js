import axios from 'axios'
import authHeader from './auth-header.js'

const API_URL = 'http://localhost:8000/api/'

class StudentService {
  getAllStudents() {
    try {
      return axios.get(API_URL + 'users', { headers: authHeader() }).then((response) => {
        return response.data
      })
    } catch (error) {
      throw error
    }
  }

  createStudent(data) {
    try {
      return axios.post(API_URL + 'users', { ...data }, { headers: authHeader() }).then((response) => {
        return response.data
      })
    } catch (error) {
      throw error
    }
  }

  updateStudent(data) {
    try {
      let group_id = data.group_id
      return axios.put(API_URL + 'users/' + data.id, { group_id }, { headers: authHeader()}).then((response) => {
        return response.data
      })
    } catch (error) {
      throw error
    }
  }  
}

export default new StudentService()
