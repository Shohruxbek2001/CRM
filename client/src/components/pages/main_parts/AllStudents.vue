<template>
  <div class="grid grid-flow-row-dense gap-4 text-gray-400">
    <div class="col-span-2 border-2 shadow rounded-lg text-center">
      <div class="flex items-center justify-between p-3 px-5">
        <p class="Title">Список всех студентов</p>
      </div>
      <table class="w-full text-sm text-left text-gray-500 mb-3">
        <thead class="text-xs text-gray-700 uppercase border-b">
          <tr>
            <th scope="col" class="px-6 py-3">Имя</th>
            <th scope="col" class="px-2 py-3"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(student, index) of students" :key="index" class="bg-white border-b hover:bg-gray-50">
            <TableItem :student="student" />
            <td class="px-6 py-4 text-right">
              <i class="fa fa-pencil cursor-pointer hover:text-blue-600"></i>
              <i @click="openModal(student)" title="Add to group" class="fa fa-folder-plus cursor-pointer hover:text-orange-600 ml-2"></i>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div id="popup-modal" tabindex="-1" class="hidden overflow-y-auto w-full overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex items-center justify-center md:inset-0 h-modal md:h-full">
      <div class="relative p-4 w-full max-w-md h-full md:h-auto">
        <div class="relative bg-white rounded-lg shadow-lg border-2 dark:bg-gray-700">
          <button type="button" @click="closeModal()" class="absolute top-3 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="popup-modal">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
          </button>
          <div class="p-6 mt-6">
            <label for="group">Guruhni tanlang:</label>
            <select name="group" class="border p-2 rounded w-full mb-6" v-model="group_id">
              <option v-for="(group, index) in groups" :value="group.id" :key="index">{{ group.name }}</option>
            </select>
            <div class="flex justify-end">
              <button @click="addStudentToGroup()" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                <i class="fa fa-plus mr-2"></i>
                Добавить
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import TableItem from './Table/TableItemForStudents.vue'
import { computed, onMounted, ref } from 'vue'
import StudentService from '../../../services/student.service'
import { useStore } from 'vuex'
import $ from 'jquery'
import iziToast from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'
import GroupService from '../../../services/group.service'

const store = useStore()
const group_id = ref('')
const students = computed(() => {
  return store.state.students
})
const groups = computed(() => {
  return store.state.groups
})
const selectedStudent = computed(() => {
  return store.state.selectedStudent
})
const addStudentsInStore = () => {
  StudentService.getAllStudents().then((data) => store.commit('setStudents', data))
}
const openModal = (student) => {
  $('#popup-modal').removeClass('hidden')
  store.commit('setSelectedStudent', student)
}
const closeModal = () => {
  $('#popup-modal').addClass('hidden')
}
const addGroupsInStore = () => {
  GroupService.getAllGroups().then((data) => store.commit('setGroups', data))
}
const addStudentToGroup = () => {
  if (group_id.value === '') {
    iziToast.warning({
      title: 'Diqqat!',
      message: 'Guruhni tanlang!',
      position: 'topRight',
    })
  } else {
    const student = {
      id: selectedStudent.value.id,
      group_id: group_id.value,
    }
    store.dispatch('student/update', student).then(
      () => {
        iziToast.success({
          message: 'O`quvchi guruhga muvaffaqiyatli qo`shildi!',
          position: 'topRight',
        })
      },
      (error) => {
        iziToast.error({
          message: (error.response && error.response.data && error.response.data.message) || error.message || error.toString(),
          position: 'topRight',
        })
      },
      closeModal()
    )
  }
}
onMounted(() => {
  addStudentsInStore(), addGroupsInStore()
})
</script>
<style scoped>
</style>