import {createStore} from "vuex";
import {auth} from "./auth.module";

const store = createStore({
    modules: {
        auth,
    },
    state() {
        return {
            isLogin: false,
            selectedPage: 'not select',
            selectedChildPage: 'not select'
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
