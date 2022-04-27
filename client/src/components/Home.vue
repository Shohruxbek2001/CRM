<template>
  <div class="w-screen">
    <Sidebar/>
    <div class="ml-60">
      <Navbar/>
      <Main/>
    </div>
  </div>
</template>

<script setup>
import store from '../store/index'
import {useRouter} from 'vue-router'
import Sidebar from './layout/Sidebar.vue'
import Navbar from './layout/Navbar.vue'
import Main from "./pages/Main.vue";

const router = useRouter()

const onLogout = () => {
  store.dispatch('auth/logout').then(() => {
    router.push('/login')
  })
}
</script>

<style>
</style>