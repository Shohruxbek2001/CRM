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
            selectedChildPage: ''
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
        }
    },
});
export default store;
