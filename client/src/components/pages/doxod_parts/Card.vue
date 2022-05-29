<template>
  <div>
    <div class="card-header flex items-center justify-between">
      <div class="title-and-status flex items-center">
        <h1 class="font-bold text-lg">{{ card.name }}</h1>
        <span class="ml-6 bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-3 py-1.5 rounded">{{ card.status }}</span>
      </div>
      <i class="fa fa-trash text-xl text-gray-400 cursor-pointer hover:text-red-500"></i>
    </div>
    <div class="card-body text-left mt-3">
      <p class="py-2">{{ card.body }}</p>
      <p class="py-1"><strong>Сумма:</strong> {{ card.sum }}</p>
      <p class="py-1"><strong>Дата:</strong> {{ card.date }}</p>
      <p class="py-1 text-right">
        <strong>Телефон: </strong><a href="tel:+79876543210">{{ card.phone }}</a>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    card: {
      type: Object,
      required: true,
    },
  },
}
</script>
<style scoped>
</style>