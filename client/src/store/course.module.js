import CourseService from '../services/course.service'

export const course = {
  namespaced: true,
  actions: {
    create({ commit }, courseData) {
      return CourseService.createCourse(courseData).then(
        (course) => {
          return Promise.resolve(course)
        },
        (error) => {
          return Promise.reject(error)
        }
      )
    },
    get({ commit }) {
      return CourseService.getAllCourses().then(
        (course) => {
          return Promise.resolve(course)
        },
        (error) => {
          return Promise.reject(error)
        }
      )
    },
  },
}
