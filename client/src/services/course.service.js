import axios from 'axios'
import authHeader from './auth-header.js'

const API_URL = 'http://localhost:8000/api/'

class CourseService {
  getAllCourses() {
    return axios.get(API_URL + 'courses', { headers: authHeader() }).then((response) => {
      return response.data
    })
  }

  createCourse(data) {
    return axios.post(API_URL + 'courses', { ...data }, { headers: authHeader() }).then((response) => {
      return response.data
    })
  }
}

export default new CourseService()
