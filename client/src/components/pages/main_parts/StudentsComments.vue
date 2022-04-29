<template>
  <div class="grid grid-flow-row-dense gap-4 text-gray-400">
    <div class="col-span-2 border-2 shadow rounded-lg text-center">
      <div class="flex items-center justify-between p-3 px-5">
        <p class="Title">Комментарии студентов</p>
        <div class="sort-and-filter">
          <div class="flex items-center">
            <p class="mr-2"><i class="fa fa-sort"></i></p>
            <select class="mr-2">
              <option value="" selected>Sort</option>
              <option value="date">Date</option>
              <option value="rating">Rating</option>
            </select>
            <p class="mr-2"><i class="fa fa-filter"></i></p>
            <select class="mr-2">
              <option value="" selected>Filter</option>
              <option value="all">All</option>
              <option value="positive">Positive</option>
              <option value="negative">Negative</option>
            </select>
          </div>
        </div>
      </div>
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 mb-3">
        <thead class="text-xs text-gray-700 uppercase dark:text-gray-400 border-b">
        <tr>
          <th scope="col" class="px-6 py-3">
            Список, Тема
          </th>
          <th scope="col" class="px-6 py-3">
            Имя
          </th>
          <th scope="col" class="px-6 py-3">
            Дата
          </th>
          <th scope="col" class="px-6 py-3">
            Степень
          </th>
          <th scope="col" class="px-2 py-3">
          </th>
        </tr>
        </thead>
        <tbody>
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            v-for="comment of comments">
          <TableItem :comment="comment"/>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import TableItem from "./Table/TableItemForComments.vue";

export default {
  data() {
    return {
      comments: [
        {
          id: 1,
          image: "https://mdbcdn.b-cdn.net/img/new/avatars/8.webp",
          title: "Привет, меня зовут Александр",
          body: "Я прошел курс по программированию",
          name: "Александр",
          userDate: "2020-05-01",
          date: "2020-05-01",
          time: "12:00 PM",
          priority: "Default"
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