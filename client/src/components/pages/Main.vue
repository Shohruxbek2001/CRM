<template>
  <div class="grid grid-cols-4 gap-4 px-3 mb-5">
    <div class="border-2 shadow rounded-lg p-3 text-center h-32">
      <div class="text-lg">Новые студенты <p class="font-medium mt-6 font-semibold text-3xl">10</p></div>
    </div>
    <div class="border-2 shadow rounded-lg p-3 text-center h-32">
      <div class="text-lg">Уходящие студенты <p class="font-medium mt-6 font-semibold text-red-500 text-3xl">12</p>
      </div>
    </div>
    <div class="border-2 shadow rounded-lg p-3 text-center h-32">
      <div class="text-lg">Комментарии студентов <p class="font-medium mt-6 font-semibold text-3xl">20</p></div>
    </div>
    <div class="border-2 shadow rounded-lg p-3 text-center h-32">
      <div class="text-lg">Все студенты <p class="font-medium mt-6 font-semibold text-3xl">45</p></div>
    </div>
  </div>
  <div class="grid grid-flow-row-dense grid-cols-3 grid-rows-3 px-3 gap-4">
    <div class="col-span-2 border-2 shadow rounded-lg p-3 text-center h-32">
      <div id="chart">Chart 1</div>
    </div>
    <div class="border-2 shadow rounded-lg p-3 text-center h-32">Chart 2</div>
  </div>
</template>

<script setup>
</script>

<style scoped>

</style>