import axios from 'axios'
const API_URL = 'http://localhost:8000'
class AuthService {
  login(user) {
    try {
      return axios
        .post(API_URL + '/login', {
          email: user.email,
          password: user.password,
        })
        .then((response) => {
          if (response.data.accessToken) {
            localStorage.setItem('user', JSON.stringify(response.data))
          }
          return response.data
        })
    } catch (error) {
      throw error
    }
  }
  logout() {
    try {
      localStorage.removeItem('user')
    } catch (error) {
      throw error
    }
  }
}

export default new AuthService()
