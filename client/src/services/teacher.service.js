import axios from 'axios'
import authHeader from './auth-header.js'

const API_URL = 'http://localhost:8000/api/'

class TeacherService {
  getAllTeachers() {
    try {
      return axios.get(API_URL + 'teachers', { headers: authHeader() }).then((response) => {
        return response.data
      })
    } catch (error) {
      throw error
    }
  }

  createTeacher(data) {
    try {
      return axios.post(API_URL + 'teachers', { ...data }, { headers: authHeader() }).then((response) => {
        return response.data
      })
    } catch (error) {
      throw error
    }
  }
}

export default new TeacherService()
