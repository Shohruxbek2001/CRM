<template>
  <div class="p-3">
    <div class="border-2 shadow rounded-lg">
      <div class="flex justify-between items-center p-3">
        <h1 class="font-bold text-2xl">O'qituvchilar boshqaruvi</h1>
        <i @click="openModal()" class="fa fa-user-plus cursor-pointer"></i>
      </div>
      <hr />
      <div class="p-1">
        <table class="w-full text-sm text-left text-gray-500 overflow-y-auto h-28">
          <thead class="text-xs text-gray-700 uppercase border-b">
            <tr class="text-left">
              <th scope="col" class="p-3 text-center">№</th>
              <th scope="col" class="p-3">O'qituvchi nomi</th>
              <th scope="col" class="p-3">Telefon raqami</th>
              <th scope="col" class="p-3">Guruh</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(teacher, index) of teachers" :key="index" class="bg-white border-b hover:bg-gray-50">
              <th class="text-center">
                {{ index + 1 }}
              </th>
              <td class="p-4 font-medium text-gray-900 whitespace-nowrap text-left">
                <p class="text-sm leading-5 font-medium text-gray-900">
                  {{ teacher.firstname + ' ' + teacher.lastname }}
                </p>
              </td>
              <td class="p-4 font-medium text-gray-900 whitespace-nowrap text-left">
                <p class="text-sm leading-5 font-medium text-gray-900">
                  {{ teacher.phone_number }}
                </p>
              </td>
              <td class="p-4 font-medium text-gray-900 whitespace-nowrap text-left">
                <p class="text-sm leading-5 font-medium text-gray-900">
                  {{ groups.map((b) => b.id === teacher.group_id ? b.name : null).filter(aa => aa !== null)[0] }}
                </p>
              </td>
              <td class="px-6 py-4 text-right">
                <i class="fa fa-user-pen cursor-pointer hover:text-blue-600" data-modal-toggle="editStudentModal"></i>
                <i title="Add archive" class="fa fa-archive cursor-pointer hover:text-orange-600 ml-2"></i>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div id="popup-modal" tabindex="-1" class="hidden overflow-y-auto w-full overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex items-center justify-center md:inset-0 h-modal md:h-full">
      <div class="relative p-4 w-full max-w-md h-full md:h-auto">
        <div class="relative bg-white rounded-lg shadow-lg border-2 dark:bg-gray-700">
          <button type="button" @click="closeModal()" class="absolute top-3 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="popup-modal">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
          </button>
          <div class="p-6 mt-6">
            <Form @submit="onSubmit" :validation-schema="schema">
              <Field name="firstname" type="text" placeholder="Ism kiriting..." v-model="firstname" class="border rounded block p-2 outline-0 mb-4 w-full" />
              <ErrorMessage name="firstname" class="error-feedback text-red-600 font-medium" />
              <Field name="lastname" type="text" placeholder="Familiya kiriting..." v-model="lastname" class="border rounded block p-2 outline-0 mb-4 w-full" />
              <ErrorMessage name="lastname" class="error-feedback text-red-600 font-medium" />
              <div class="mb-6">
                <Field name="email" type="email" placeholder="email@email.com" v-model="email" class="border rounded block p-2 outline-0 mb-4 w-full" />
                <ErrorMessage name="email" class="error-feedback text-red-600 font-medium" />
              </div>
              <div class="mb-6">
                <Field name="password" type="password" placeholder="password" v-model="password" class="border rounded block p-2 outline-0 mb-4 w-full" />
                <ErrorMessage name="password" class="error-feedback text-red-600 font-medium" />
              </div>
              <div class="mb-6">
                <Field name="phone_number" id="phone_number" type="phone" placeholder="+998 90 012 34 67" v-model="phone_number" class="border rounded block p-2 outline-0 mb-4 w-full" />
                <ErrorMessage name="phone_number" class="error-feedback text-red-600 font-medium" />
              </div>
              <select name="group" class="border p-2 rounded w-full mb-6" v-model="group_id">
                <option value="" selected>Guruhni tanlang</option>
                <option v-for="(group, index) in groups" :value="group.id" :key="index">{{ group.name }}</option>
              </select>
              <div class="mb-6">
                <select name="gender" class="border p-2 rounded w-full mb-6" v-model="gender">
                  <option value="" selected>Jinsni tanlang...</option>
                  <option value="male" selected>Erkak</option>
                  <option value="female" selected>Ayol</option>
                </select>
              </div>
              <div class="flex">
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
import { ref } from 'vue'
import { computed, onMounted } from 'vue'
import $ from 'jquery'
import GroupService from '../../services/group.service'
import TeacherService from '../../services/teacher.service'

const store = useStore()

const firstname = ref('')
const lastname = ref('')
const phone_number = ref('')
const email = ref('')
const password = ref('')
const gender = ref('')
const group_id = ref('')
const region = ref('')
const address = ref('')

const groups = computed(() => {
  return store.state.groups
})

const teachers = computed(() => {
  return store.state.teachers
})
const openModal = () => {
  $('#popup-modal').removeClass('hidden')
}
const closeModal = () => {
  $('#popup-modal').addClass('hidden')
}
const addGroupsInStore = () => {
  GroupService.getAllGroups().then((data) => store.commit('setGroups', data))
}
const addTeachersInStore = () => {
  TeacherService.getAllTeachers().then((data) => store.commit('setTeachers', data))
}
onMounted(() => {
  addGroupsInStore()
  addTeachersInStore()
})

const schema = yup.object().shape({
  firstname: yup.string().required('Iltimos. Ismni kitiring!'),
  lastname: yup.string().required('Iltimos. Familiyani kitiring!'),
  phone_number: yup.string().required('Iltimos. Telefon raqamini kitiring!'),
  email: yup.string().required('Iltimos. Emailni kitiring!'),
  password: yup.string().required('Iltimos. Parolni kitiring!'),
})

const onSubmit = (teacher) => {
  if (gender.value === '') {
    iziToast.error({
      message: 'Iltimos, jinsni tanlang!',
      position: 'topRight',
    })
  } else {
    teacher = {
      ...teacher,
      img: `https://ui-avatars.com/api/?name=${firstname.value + lastname.value}`,
      group_id: group_id.value,
      gender: gender.value,
    }
    store.dispatch('teacher/create', teacher).then(
      () => {
        iziToast.success({
          message: 'O`qituvchi muvaffaqiyatli qo`shildi!',
          position: 'topRight',
        })
        addTeachersInStore()
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