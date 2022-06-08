<template>
  <div class="p-3">
    <div class="border-2 shadow rounded-lg">
      <div class="flex justify-between items-center px-3">
        <h1 class="font-bold text-2xl py-3">Guruhlarni boshqarish</h1>
        <i @click="openModal()" class="fa fa-plus cursor-pointer font-serif uppercase font-light p-3 rounded bg-green-500 text-white hover:bg-green-700"> guruh qo'shish</i>
      </div>
      <hr />
      <div class="p-3 px-5">
        <div class="flex justify-end">
          <div class="inline-flex rounded-md shadow-sm">
            <a href="#" aria-current="page" class="py-2 px-4 text-sm font-medium text-blue-700 bg-white rounded-l-lg border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
              Hammasi
            </a>
            <a href="#" class="py-2 px-4 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
              O'qituvchiga biriktirilgan
            </a>
            <a href="#" class="py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-r-md border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
              Biriktirilmagan
            </a>
          </div>
        </div>
        <hr class="mt-2">
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
    <div id="popup-modal" tabindex="-1" class="hidden overflow-y-auto w-full overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex items-center justify-center md:inset-0 h-modal md:h-full">
      <div class="relative p-4 w-full max-w-lg h-full md:h-auto">
        <div class="relative bg-white rounded-lg shadow-lg border-2 dark:bg-gray-700">
          <button type="button" @click="closeModal()" class="absolute top-3 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="popup-modal">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
          </button>
          <div class="p-5 pt-8">
            <Form @submit="onSubmit" :validation-schema="schema" class="w-full mt-4">
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
              <select name="teacher" class="border p-2 rounded w-full mb-6" v-model="teacher_id">
                <option value="" selected>O'qituvchini tanlang</option>
                <option v-for="(teacher, index) in teachers" :value="teacher.id" :key="index">{{ teacher.firstname + " " + teacher.lastname }}</option>
              </select>
              <div class="mb-6">
                <select name="room" class="border p-2 rounded w-full mb-6" v-model="room_id">
                  <option value="" selected>Xonani tanlang...</option>
                  <option v-for="(room, index) in rooms" :value="room.id" :key="index">{{ `${room.name} - xona, ${branches.map((b) => b.id === room.branch_id ? b.name : null).filter(i => i !== null)[0]} filiali` }}</option>
                </select>
              </div>
              <div class="flex justify-end">
                <button type="submit" class="w-full p-2 text-center block bg-green-500 text-white rounded text-xl hover:bg-green-600 focus:border focus:border-gray-600">Qo'shish</button>
              </div>
            </Form>
          </div>
        </div>
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
import $ from 'jquery'
import { computed, onBeforeMount, ref } from 'vue'
import GroupService from '../../services/group.service'
import RoomService from '../../services/room.service'
import CourseService from '../../services/course.service'
import StudentService from '../../services/student.service'
import TeacherService from '../../services/teacher.service'
import BranchService from '../../services/branch.service'

const store = useStore()

const name = ref('')
const days = ref('')
const course_id = ref('')
const start_date = ref('')
const room_id = ref('')
const teacher_id = ref('')

const openModal = () => {
  $('#popup-modal').removeClass('hidden')
}
const closeModal = () => {
  $('#popup-modal').addClass('hidden')
}
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
const teachers = computed(() => {
  return store.state.teachers
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
const addTeachersInStore = () => {
  TeacherService.getAllTeachers().then((data) => store.commit('setTeachers', data))
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
  addTeachersInStore()
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
      teacher_id: teacher_id.value,
    }
    store.dispatch('group/create', group).then(
      () => {
        iziToast.success({
          message: 'Guruh muvaffaqiyatli qo`shildi!',
          position: 'topRight',
        })
        addGroupsInStore()
        closeModal()
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