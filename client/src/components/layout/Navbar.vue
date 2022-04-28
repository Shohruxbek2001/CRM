<template>
  <div class="bg-white h-14 p-3 sticky-top">
    <div class="flex justify-between items-center">
      <div class="font-medium font-bold">Page name</div>
      <div>
        <i class="fa fa-bell px-3 cursor-pointer hover:text-blue-600"></i>
        <strong class="px-3 border-l-2 cursor-pointer hover:text-blue-600">Jackson</strong>
        <router-link to="/login"><i class="fa fa-sign-out px-2 cursor-pointer hover:text-blue-600"
                                    @click="onLogout()"></i></router-link>
      </div>
    </div>
  </div>
</template>

<script>
import {computed} from 'vue';
import {useStore} from 'vuex'
import router from "../../router";

export default {
  setup() {
    const store = useStore()

    let login = computed(() => {
      return store.state.isLogin
    })

    function checkLogin(data) {
      store.commit('setLogin', data)
    }

    function onLogout() {
      checkLogin(false)
      store.commit('logout')
      router.push('/login')
    }

    return {
      login,
      onLogout
    }
  }
}
</script>

<style scoped>
</style>