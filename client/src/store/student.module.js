import StudentService from '../services/student.service'

export const student = {
  namespaced: true,
  actions: {
    create({ commit }, studentData) {
      return StudentService.createStudent(studentData).then(
        (student) => {
          return Promise.resolve(student)
        },
        (error) => {
          return Promise.reject(error)
        }
      )
    },
    update({ commit }, studentData) {
      return StudentService.updateStudent(studentData).then(
        (student) => {
          return Promise.resolve(student)
        },
        (error) => {
          return Promise.reject(error)
        }
      )
    },
    get({ commit }) {
      return StudentService.getAllStudents().then(
        (student) => {
          return Promise.resolve(student)
        },
        (error) => {
          return Promise.reject(error)
        }
      )
    },
  },
}
