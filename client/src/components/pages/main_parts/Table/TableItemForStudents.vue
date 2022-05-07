<template>
  <th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
    <div class="flex items-center">
      <img :src="student.img" class="rounded-full w-12 inline-block"
           alt="Avatar"/>
      <div class="ml-2 inline-block">
        <p class="text-sm leading-5 font-medium text-gray-900 dark:text-white">
          {{ student.firstname }}
        </p>
        <p class="text-sm leading-5 text-gray-300 dark:text-gray-400">
          ro'yhatdan o'tgan sana: {{ student.created_at.replace('T', " ").slice(0, student.created_at.indexOf('.')) }}
        </p>
      </div>
    </div>
  </th>
  <td class="px-6 py-4 text-right">
    <i class="fa fa-pencil cursor-pointer hover:text-blue-600" data-modal-toggle="editStudentModal"></i>
    <i title="Add archive" class="fa fa-archive cursor-pointer hover:text-orange-600 ml-2"></i>
  </td>
</template>
<script>
export default {
  name: 'TableItemForStudents',
  props: {
    student: {
      type: Object,
      required: true
    }
  }
}
</script>
