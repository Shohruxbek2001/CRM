import { createStore } from 'vuex'
import { auth } from './auth.module'
import { student } from './student.module'
import { teacher } from './teacher.module'
import { branch } from './branch.module'
import { room } from './room.module'
import { price } from './price.module'
import { course } from './course.module'
import { group } from './group.module'
import { admin } from './admin.module'

const store = createStore({
  modules: {
    auth,
    student,
    teacher,
    branch,
    room,
    price,
    course,
    group,
    admin
  },
  state() {
    return {
      isLogin: false,
      selectedPage: '',
      selectedStudent: {},
      selectedChildPage: '',
      admins: [],
      students: [],
      teachers: [],
      groups: [],
      branches: [],
      rooms: [],
      prices: [],
      courses: [],
    }
  },
  mutations: {
    setLogin(state, payload) {
      state.isLogin = payload
    },
    setSelectedChildPage(state, page) {
      state.selectedChildPage = page
    },
    setSelectedPage(state, page) {
      state.selectedPage = page
    },
    setSelectedStudent(state, student) {
      state.selectedStudent = student
    },
    setAdmins(state, data) {
      state.admins = data
    },
    setStudents(state, data) {
      state.students = data
    },
    setTeachers(state, data) {
      state.teachers = data
    },
    setGroups(state, data) {
      state.groups = data
    },
    setBranches(state, data) {
      state.branches = data
    },
    setRooms(state, data) {
      state.rooms = data
    },
    setPrices(state, data) {
      state.prices = data
    },
    setCourses(state, data) {
      state.courses = data
    },
  },
  getters: {
    allGroups: (state) => state.groups
  }
})
export default store
