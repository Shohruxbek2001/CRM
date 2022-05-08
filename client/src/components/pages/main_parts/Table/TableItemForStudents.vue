<template>
  <td scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
    <div class="flex items-center">
      <img :src="student.img" class="rounded-full w-12 inline-block" alt="Avatar" />
      <div class="ml-2 inline-block">
        <p class="text-sm leading-5 font-medium text-gray-900 dark:text-white">
          {{ `${student.firstname} ${student.lastname}` }}
        </p>
        <p class="text-sm leading-5 text-gray-300 dark:text-gray-400">ro'yhatdan o'tgan sana: {{ student.created_at.replace('T', ' ').slice(0, student.created_at.indexOf('.')) }}</p>
      </div>
    </div>
  </td>
</template>
<script>
export default {
  name: 'TableItemForStudents',
  props: {
    student: {
      type: Object,
      required: true,
    },
  },
}
</script>
