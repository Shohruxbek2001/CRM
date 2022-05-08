<template>
  <div>
    <div class="grid grid-flow-row-dense gap-4 text-gray-400 p-3">
      <div class="col-span-2 border-2 shadow rounded-lg text-center">
        <div class="flex items-center justify-between p-3 px-5">
          <p class="Title">Chart title</p>
        </div>
      </div>
    </div>
    <div class="grid grid-flow-row-dense grid-cols-3 grid-rows-3 gap-4 px-3">
      <div class="col-span-2 border-2 shadow rounded-lg p-3 text-center">
        <div id="chart">Another chart here</div>
      </div>
      <div class="border-2 shadow rounded-lg p-3 text-center">Chart details</div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
</style>