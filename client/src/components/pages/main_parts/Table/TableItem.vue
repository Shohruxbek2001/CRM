<template>
  <th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
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
  </th>
  <td class="px-6 py-4">
    <div class="ml-2 inline-block">
      <p class="text-sm leading-5 font-medium text-gray-900 dark:text-white">
        {{ comment.name }}
      </p>
      <p class="text-sm leading-5 text-gray-300 dark:text-gray-400">
        до {{ comment.userDate }}
      </p>
    </div>
  </td>
  <td class="px-6 py-4">
    <div class="ml-2 inline-block">
      <p class="text-sm leading-5 font-medium text-gray-900 dark:text-white">
        {{ comment.date }}
      </p>
      <p class="text-sm leading-5 text-gray-300 dark:text-gray-400">
        {{ comment.time }}
      </p>
    </div>
  </td>
  <td class="px-6 py-4">
    <span class="bg-orange-500 px-4 text-white text-xs font-semibold mr-2 py-1.5 rounded-3xl dark:bg-blue-200 dark:text-blue-800">
      {{ comment.priority }}
    </span>
  </td>
  <td class="px-6 py-4 text-right">
    <i class="fa fa-ellipsis-vertical cursor-pointer"></i>
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
<style>

</style>
