<template>
  <td scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
    <div class="flex items-center">
      <img :src="comment.image" class="rounded-full w-12 inline-block"
           alt="Avatar"/>
      <div class="ml-2 inline-block">
        <p class="text-sm leading-5 font-medium text-gray-900 dark:text-white">
          {{ comment.title }}
        </p>
        <p class="text-sm leading-5 text-gray-300 dark:text-gray-400">
          {{ comment.body }}
        </p>
      </div>
    </div>
  </td>
</template>
<script>
export default {
  name: 'TableItem',
  props: {
    comment: {
      type: Object,
      required: true
    }
  }
}
</script>
<style scoped>
</style>
