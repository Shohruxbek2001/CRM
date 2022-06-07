<template>
  <div class="p-3">
    <div class="border-2 shadow rounded-lg">
      <h1 class="font-bold text-3xl p-3 px-5">Guruhlarni boshqarish</h1>
      <hr />
      <div class="p-3 px-5">
        <Form @submit="onSubmit" :validation-schema="schema" class="w-96 shadow rounded p-3 mb-3 mx-auto">
          <Field name="name" type="text" placeholder="Guruh nomi..." v-model="name" class="border rounded block p-2 outline-0 mb-4 w-full" />
          <ErrorMessage name="name" class="error-feedback text-red-600 font-medium" />
          <Field name="days" type="text" placeholder="Dars kunlari..." v-model="days" class="border rounded block p-2 outline-0 mb-4 w-full" />
          <ErrorMessage name="days" class="error-feedback text-red-600 font-medium" />
          <Field name="start_date" type="datetime-local" v-model="start_date" class="border rounded block p-2 outline-0 mb-4 w-60" />
          <ErrorMessage name="start_date" class="error-feedback text-red-600 font-medium" />
          <select name="course" class="border p-2 rounded w-full mb-6" v-model="course_id">
            <option value="" selected>Kursni tanlang</option>
            <option v-for="(course, index) in courses" :value="course.id" :key="index">{{ course.name }}</option>
          </select>
          <div class="mb-6">
            <select name="room" class="border p-2 rounded w-full mb-6" v-model="room_id">
              <option value="" selected>Xonani tanlang...</option>
              <option v-for="(room, index) in rooms" :value="room.id" :key="index">{{ `${room.name} - xona, ${branches.filter((b) => b.id === room.branch_id)[0]['name']} filiali` }}</option>
            </select>
          </div>
          <div class="flex justify-end">
            <button type="submit" class="w-full p-2 text-center block bg-green-500 text-white rounded text-xl hover:bg-green-600 focus:border focus:border-gray-600">Qo'shish</button>
          </div>
        </Form>
        <hr>
        <table class="w-full text-sm text-left text-gray-500">
          <thead class="text-xs text-gray-700 uppercase border-b">
            <tr class="text-left">
              <th scope="col" class="px-2 py-3">№</th>
              <th scope="col" class="p-3">Guruh nomi</th>
              <th scope="col" class="p-3">Dars boshlangan sana</th>
              <th scope="col" class="p-3">Dars kunlari</th>
              <th scope="col" class="p-3">Kurs nomi</th>
              <th scope="col" class="p-3">O`quvchilar soni</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(group, index) of groups" :key="index" class="bg-white border-b hover:bg-gray-50">
              <th class="w-13 p-2 text-center">
                {{ index + 1 }}
              </th>
              <td scope="row" class="p-4 font-medium text-gray-900  whitespace-nowrap text-left">
                <p class="text-sm leading-5 font-medium text-gray-900 ">
                  {{ group.name }}
                </p>
              </td>
              <td scope="row" class="p-4 font-medium text-gray-900  whitespace-nowrap text-left">
                <p class="text-sm leading-5 font-medium text-gray-900 ">
                  {{ group.start_date.replace('T', " ").slice(0, group.start_date.indexOf(".")) }}
                </p>
              </td>
              <td scope="row" class="p-4 font-medium text-gray-900  whitespace-nowrap text-left">
                <p class="text-sm leading-5 font-medium text-gray-900 ">
                  <ul>
                    <li v-for="(day, index) of group.days_in_week.split(',')" :key="index" class="capitalize">{{day}}</li>
                  </ul>
                </p>
              </td>
              <td scope="row" class="p-4 font-medium text-gray-900  whitespace-nowrap text-left">
                <p class="text-sm leading-5 font-medium text-gray-900 ">
                  {{ courses.map((b) => b.id === group.course_id ? b.name : null).filter(i => i !== null)[0] }}
                </p>
              </td>
              <td scope="row" class="p-4 font-medium text-gray-900  whitespace-nowrap text-left">
                <p class="text-sm leading-5 font-medium text-gray-900 ">
                  {{ students.filter((b) => b.group_id === group.id).length }}
                </p>
              </td>
              <td class="px-6 py-4 text-right">
                <i class="fa fa-pencil cursor-pointer hover:text-blue-600" data-modal-toggle="editStudentModal"></i>
                <i title="Add archive" class="fa fa-archive cursor-pointer hover:text-orange-600 ml-2"></i>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ErrorMessage, Field, Form } from 'vee-validate'
import * as yup from 'yup'
import { useStore } from 'vuex'
import iziToast from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'
import { computed, onBeforeMount, ref } from 'vue'
import GroupService from '../../services/group.service'
import RoomService from '../../services/room.service'
import CourseService from '../../services/course.service'
import StudentService from '../../services/student.service'
import BranchService from '../../services/branch.service'

const store = useStore()

const name = ref('')
const days = ref('')
const course_id = ref('')
const start_date = ref('')
const room_id = ref('')

const groups = computed(() => {
  return store.state.groups
})
const rooms = computed(() => {
  return store.state.rooms
})
const courses = computed(() => {
  return store.state.courses
})
const students = computed(() => {
  return store.state.students
})
const branches = computed(() => {
  return store.state.branches
})
const addRoomsInStore = () => {
  RoomService.getAllRooms().then((data) => store.commit('setRooms', data))
}
const addGroupsInStore = () => {
  GroupService.getAllGroups().then((data) => store.commit('setGroups', data))
}
const addCoursesInStore = () => {
  CourseService.getAllCourses().then((data) => store.commit('setCourses', data))
}
const addStudentsInStore = () => {
  StudentService.getAllStudents().then((data) => store.commit('setStudents', data))
}
const addBranchesInStore = () => {
  BranchService.getAllBranches().then((data) => store.commit('setBranches', data))
}
onBeforeMount(() => {
  addGroupsInStore()
  addBranchesInStore()
  addCoursesInStore()
  addRoomsInStore()
  addStudentsInStore()
})

const schema = yup.object().shape({
  name: yup.string().required('Iltimos. Guruh nomini kitiring!'),
  days: yup.string().required('Iltimos. Dars kunlarini kitiring!'),
  start_date: yup.string().required('Iltimos. Dars boshlanadigan sanani kitiring!'),
})

const onSubmit = (group) => {
  if (course_id.value === '') {
    iziToast.error({
      message: 'Iltimos, kursni tanlang!',
      position: 'topRight',
    })
  } else if (room_id.value === '') {
    iziToast.error({
      message: 'Iltimos, xonani tanlang!',
      position: 'topRight',
    })
  } else {
    group = {
      ...group,
      course_id: course_id.value,
      room_id: room_id.value,
    }
    store.dispatch('group/create', group).then(
      () => {
        iziToast.success({
          message: 'Guruh muvaffaqiyatli qo`shildi!',
          position: 'topRight',
        })
        addGroupsInStore()
      },
      (error) => {
        iziToast.error({
          message: (error.response && error.response.data && error.response.data.message) || error.message || error.toString(),
          position: 'topRight',
        })
      }
    )
  }
}
</script>