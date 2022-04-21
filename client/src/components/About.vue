<template>
  <div>
    <h1 class="text-3xl font-bold text-center">
      My name is <span class="text-indigo-600">{{ name }}</span>
    </h1>
    <button @click="back" class="p-2 bg-indigo-600 rounded text-white">
      Back
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useStore()

const name = computed(() => {
  return "Jack"
})

function back() {
  router.push('/')
}
</script>

<style scoped>
</style>