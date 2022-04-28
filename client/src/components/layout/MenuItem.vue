<template>
  <router-link v-bind:to="menu.url"
               class="flex items-center border-gray-900 text-sm py-4 px-6 h-12 overflow-hidden text-gray-500 text-ellipsis border-l-4 whitespace-nowrap hover:text-gray-200 hover:border-l-4 hover:border-gray-100 hover:bg-gray-800 transition duration-300 ease-in-out"
               data-mdb-ripple="true"
               data-mdb-ripple-color="primary"
  >
    <span class="font-medium"><i class="fa mr-3" :class="menu.icon"></i>{{ menu.name }}</span>
  </router-link>
</template>

<script>
export default {
  props: {
    menu: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
</style>