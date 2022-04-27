<template>
  <div class="bg-indigo-900 flex justify-between p-3 text-white items-center">
    <h1 class="font-extrabold text-3xl text-center">Admin Dashboard</h1>
    <button @click="onLogout()" class="bg-red-700 rounded px-3 py-2">Chiqish <i class="fa fa-sign-out ml-1"></i></button>
  </div>
</template>

<script setup>
import store from '../store/index'
import { useRouter } from 'vue-router'
const router = useRouter()

const onLogout = () => {
  store.dispatch('auth/logout').then(() => {
    router.push('/login')
  })
}
</script>

<style>
</style>