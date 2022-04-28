import { createStore } from "vuex";
import { auth } from "./auth.module";
const store = createStore({
  modules: {
    auth,
  },
  state() {
    return {
      isLogin: false
    }
  },
  mutations: {
    setLogin(state, payload) {
      state.isLogin = payload
    }
  },
});
export default store;
