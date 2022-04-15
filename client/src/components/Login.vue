<template>
  <div class="bg-cover bg-fixed w-100 h-screen" style="background-image: url('/src/assets/images/main-bg.jpg')">
    <div class="h-screen bg-slate-900/75 flex justify-center items-center big-wrapper">
      <div class="form-wrapper w-3/12 bg-slate-900/50 p-10 rounded-xl backdrop-blur-sm">
        <div id="clock" class="text-9xl text-white text-center font-medium">00:00</div>
        <div id="fullDate" class="text-4xl text-white text-center font-medium my-5 mb-10 uppercase">weekday 00 Month 0000</div>
        <form>
          <div class="mb-6">
            <input
              type="email"
              id="email"
              class="bg-white/25 border border-white text-white text-xl placeholder:text-white outline-none rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-4"
              placeholder="email@email.com"
              required
            />
          </div>
          <div class="mb-6">
            <input
              type="password"
              id="password"
              class="bg-white/25 border border-white text-white text-xl placeholder:text-white outline-none rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-4"
              placeholder="password"
              required
            />
          </div>
          <button type="submit" class="text-white bg-blue-700/75 hover:bg-blue-800/100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-lg w-full px-5 py-4 text-center">
            Submit
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed, effect } from 'vue'
import $ from 'jquery'
const updateClock = () => {
  let currentTime = new Date()
  let currentMinutes = currentTime.getMinutes()
  currentMinutes = (currentMinutes < 10 ? '0' : '') + currentMinutes
  $('#clock').text(currentTime.getHours() + ':' + currentMinutes)
}
const fullDate = () => {
  let now = new Date()
  let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  let date = days[now.getDay()] + ' ' + now.getDate() + ' ' + monthNames[now.getMonth()] + ' ' + now.getFullYear()
  $('#fullDate').text(date)
}
onMounted(() => {
  fullDate()
  setInterval(updateClock, 1000)
})
</script>


<style scoped>
</style>