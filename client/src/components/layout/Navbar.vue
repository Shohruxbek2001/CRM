<template>
  <div class="bg-white h-14 p-3 shadow mb-3 flex justify-between items-center sticky-top">
    <div class="font-bold">{{ page }}</div>
    <div>
      <i class="fa fa-bell px-3 cursor-pointer hover:text-blue-600"></i>
      <strong class="px-3 border-l-2 cursor-pointer hover:text-blue-600 capitalize">{{ userInfo.user.name }}</strong>
      <a href="/login"><i class="fa fa-sign-out px-2 cursor-pointer hover:text-red-600"
                          @click="onLogout()"></i></a>
    </div>
  </div>
</template>

<script>
import {useStore} from 'vuex'
import {useRouter} from "vue-router";
import {computed} from "vue";

export default {
  setup() {
    const store = useStore()
    const router = useRouter()

    const userInfo = computed(() => JSON.parse(localStorage.getItem('user')))
    function checkLogin(data) {
      store.commit('setLogin', data)
    }

    function onLogout() {
      store.dispatch('auth/logout').then(() => {
        checkLogin(false)
        router.push('/login')
      })
    }

    let page = computed(() => {
      return store.state.selectedPage
    })

    return {
      page,
      onLogout,
      userInfo
    }
  }
}
</script>

<style scoped>
</style>