<template>
  <div class="grid grid-flow-row-dense gap-4 text-gray-400">
    <div class="col-span-2 border-2 shadow rounded-lg text-center">
      <div class="flex items-center justify-between p-3 px-5">
        <p class="Title">Список всех студентов</p>
      </div>
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 mb-3">
        <thead class="text-xs text-gray-700 uppercase dark:text-gray-400 border-b">
          <tr>
            <th scope="col" class="px-6 py-3">Имя</th>
            <th scope="col" class="px-2 py-3"></th>
          </tr>
        </thead>
        <tbody>
          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" v-for="student of students" :key="student.id">
            <TableItem :student="student" />
            <td class="px-6 py-4 text-right">
              <i class="fa fa-pencil cursor-pointer hover:text-blue-600" data-modal-toggle="editStudentModal"></i>
              <i title="Add archive" class="fa fa-archive cursor-pointer hover:text-orange-600 ml-2"></i>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import TableItem from './Table/TableItemForStudents.vue'
import { computed, onMounted } from 'vue'
import StudentService from '../../../services/student.service'
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore()
    const students = computed(() => {
      return store.state.students
    })
    const addStudentsInStore = () => {
      StudentService.getAllStudents().then((data) => store.commit('setStudents', data))
    }
    onMounted(() => {
      addStudentsInStore()
    })
    return {
      students,
    }
  },
  components: {
    TableItem,
  },
}
</script>