import {createStore} from "vuex";
import {auth} from "./auth.module";
import {student} from "./student.module";

const store = createStore({
    modules: {
        auth,
        student
    },
    state() {
        return {
            isLogin: false,
            selectedPage: '',
            selectedChildPage: '',
            admins: [],
            students: [],
            groups: []
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
        }
    },
});
export default store;
