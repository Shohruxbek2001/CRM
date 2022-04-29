<template>
  <div class="grid grid-flow-row-dense gap-4 text-gray-400">
    <div class="col-span-2 border-2 shadow rounded-lg text-center">
      <div class="flex items-center justify-between p-3 px-5">
        <p class="Title">Список всех студентов</p>
      </div>
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 mb-3">
        <thead class="text-xs text-gray-700 uppercase dark:text-gray-400 border-b">
        <tr>
          <th scope="col" class="px-6 py-3">
            Имя
          </th>
          <th scope="col" class="px-2 py-3">
          </th>
        </tr>
        </thead>
        <tbody>
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            v-for="student of students">
          <TableItem :student="student"/>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import TableItem from "./Table/TableItemForStudents.vue";

export default {
  data() {
    return {
      students: [
        {
          id: 1,
          image: "https://mdbcdn.b-cdn.net/img/new/avatars/8.webp",
          name: "Александр",
          date: "2"
        },
      ]
    }
  },
  components: {
    TableItem
  }
}
</script>
<style scoped>

</style>