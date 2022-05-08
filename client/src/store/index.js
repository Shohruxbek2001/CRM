import { createStore } from 'vuex'
import { auth } from './auth.module'
import { student } from './student.module'
import { branch } from './branch.module'
import { room } from './room.module'

const store = createStore({
  modules: {
    auth,
    student,
    branch,
    room,
  },
  state() {
    return {
      isLogin: false,
      selectedPage: '',
      selectedChildPage: '',
      admins: [],
      students: [],
      groups: [],
      branches: [],
      rooms: [],
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
    setAdmins(state, data) {
      state.admins = data
    },
    setStudents(state, data) {
      state.students = data
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
  },
})
export default store
