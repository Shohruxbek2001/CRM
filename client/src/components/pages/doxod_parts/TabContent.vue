<template>
  <div class="grid grid-cols-2 gap-4 px-3 mb-5">
    <div class="card-wrapper border-2 rounded-lg p-5" v-for="(card, index) of content.cards" :key="index">
      <Card :card="card" />
    </div>
  </div>
</template>
<script>
import Card from './Card.vue'
export default {
  name: 'TabContent',
  props: {
    content: {
      type: Object,
      required: true,
    },
  },
  components: {
    Card,
  },
}
</script>
<style scoped>
</style>