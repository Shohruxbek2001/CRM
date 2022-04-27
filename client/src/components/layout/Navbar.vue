<template>
  <div>
    <div class="bg-white h-14 p-3">
      <div class="flex justify-between items-center">
        <div class="font-medium font-bold">Page name</div>
        <div>
          <i class="fa fa-bell px-3 cursor-pointer hover:text-blue-600"></i>
          <strong class="px-3 border-l-2 cursor-pointer hover:text-blue-600">Jackson</strong>
          <i class="fa fa-sign-out px-2 cursor-pointer hover:text-blue-600" @click="onLogout()"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import store from '../../store/index'
import {useRouter} from 'vue-router'

const router = useRouter()

const onLogout = () => {
  store.dispatch('auth/logout').then(() => {
    router.push('/login')
  })
}
</script>

<style scoped>
</style>