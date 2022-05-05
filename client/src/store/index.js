import {createStore} from "vuex";
import {auth} from "./auth.module";

const store = createStore({
    modules: {
        auth,
    },
    state() {
        return {
            isLogin: false,
            selectedPage: '',
            selectedChildPage: '',
            admins: [],
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
    },
});
export default store;
