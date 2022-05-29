import axios from 'axios'
import authHeader from './auth-header.js'

const API_URL = 'http://localhost:8000/api/'

class CourseService {
  getAllCourses() {
    try {
      return axios.get(API_URL + 'courses', { headers: authHeader() }).then((response) => {
        return response.data
      })
    } catch (error) {
      throw error
    }
  }

  createCourse(data) {
    try {
      return axios.post(API_URL + 'courses', { ...data }, { headers: authHeader() }).then((response) => {
        return response.data
      })
    } catch (error) {
      throw error
    }
  }
}

export default new CourseService()
