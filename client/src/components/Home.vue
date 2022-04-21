<template>
  <div>
    <h1 class="font-extrabold text-3xl mb-6">Home</h1>
    <p class="mb-3">Name in store id: {{ name }}</p>
    <input
      v-model="newName"
      type="text"
      class="p-2 border border-gray-600 rounded mr-2"
    />
    <button
      @click="saveName"
      class="p-2 bg-indigo-600 rounded text-white hover:bg-indigo-500"
    >
      Save
    </button>
  </div>
</template>

<script setup>
// import { computed, ref } from 'vue'
// import { useStore } from 'vuex'
// import { useRouter } from 'vue-router'

// const router = useRouter()

// const store = useStore()

// const name = computed(() => {
//   return store.state.user.name
// })

// const newName = ref('')

// function saveName() {
//   store.dispatch('saveName', newName.value)
//   newName.value = ''
//   router.push('/about')
// }
</script>

<style>
</style>