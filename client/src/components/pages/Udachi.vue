<template>
  <div class="p-3">
    <div class="border-2 shadow rounded-lg">
      <h1 class="font-bold text-3xl p-3 px-5">O'quvchi qo'shish</h1>
      <hr />
      <div class="p-3 px-5">
        <Form @submit="onSubmit" :validation-schema="schema">
          <div class="grid grid-cols-2 gap-4">
            <div>
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
              <select name="group" class="border p-2 rounded w-full mb-6" v-model="group_id">
                <option value="" selected>Guruhni tanlang</option>
                <option v-for="(group, index) in groups" :value="index" :key="index">{{ group.name }}</option>
              </select>
              <div class="mb-6">
                <Field name="phone_number" id="phone_number" type="phone" placeholder="+998 90 012 34 67" v-model="phone_number" class="border rounded block p-2 outline-0 mb-4 w-full" />
              </div>
              <div class="mb-6">
                <select name="gender" class="border p-2 rounded w-full mb-6" v-model="gender">
                  <option value="" selected>Jinsni tanlang...</option>
                  <option value="male" selected>Erkak</option>
                  <option value="female" selected>Ayol</option>
                </select>
              </div>
            </div>
            <div>
              <Field name="parent_fullname" type="text" placeholder="Ota-onaning ismini kiriting..." v-model="parent_fullname" class="border rounded block p-2 outline-0 mb-4 w-full" />
              <ErrorMessage name="parent_fullname" class="error-feedback text-red-600 font-medium" />
              <Field name="parent_phone_number" id="parent_phone_number" type="phone" placeholder="Ota-onaning telefon raqamini kiriting..." v-model="parent_phone_number" class="border rounded block p-2 outline-0 mb-4 w-full" />
              <ErrorMessage name="parent_phone_number" class="error-feedback text-red-600 font-medium" />
              <div class="flex justify-end">
                <div class="actions flex justify-end items-center px-1 w-11 cursor-pointer rounded-full">
                  <div class="flex justify-center items-center hidden">
                    <i class="fa-solid fa-user-pen hover:text-blue-600 mr-2"></i>
                    <i class="fa-solid fa-trash hover:text-red-600 mr-2"></i>
                  </div>
                  <i @click="openActions(this)" class="fa-solid fa-ellipsis-vertical py-2.5 px-4 hover:shadow rounded-full"></i>
                </div>
              </div>
              <div class="flex justify-end">
                <div class="actions flex justify-end items-center px-1 w-11 cursor-pointer rounded-full">
                  <div class="flex justify-center items-center hidden">
                    <i class="fa-solid fa-user-pen hover:text-blue-600 mr-2"></i>
                    <i class="fa-solid fa-trash hover:text-red-600 mr-2"></i>
                  </div>
                  <i @click="openActions()" class="fa-solid fa-ellipsis-vertical py-2.5 px-4 hover:shadow rounded-full"></i>
                </div>
              </div>
            </div>
          </div>
          <div class="flex justify-end">
            <button type="submit" class="w-72 p-2 text-center block bg-green-500 text-white rounded text-xl hover:bg-green-600 focus:border focus:border-gray-600">Qo'shish</button>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ErrorMessage, Field, Form } from 'vee-validate'
import * as yup from 'yup'
import { useStore } from 'vuex'
import $ from 'jquery'
import iziToast from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'
import { ref } from 'vue'
import { computed, onMounted } from 'vue'
import GroupService from '../../services/group.service'

const store = useStore()

const firstname = ref('')
const lastname = ref('')
const phone_number = ref('')
const email = ref('')
const password = ref('')
const gender = ref('')
const group_id = ref('')
const parent_fullname = ref('')
const parent_phone_number = ref('')
const region = ref('')
const address = ref('')

const groups = computed(() => {
  return store.state.groups
})
const addGroupsInStore = () => {
  GroupService.getAllGroups().then((data) => store.commit('setGroups', data))
}
onMounted(() => {
  addGroupsInStore()
})

function openActions() {
  $('.actions > i').toggleClass('fa-ellipsis-vertical').toggleClass('fa-times')
  $('.actions').toggleClass('w-11').toggleClass('w-28').toggleClass('shadow')
  $('.actions > div').toggleClass('hidden')
}

const schema = yup.object().shape({
  parent_fullname: yup.string().required('Iltimos. Ota-onaning ismini kitiring!'),
  parent_phone_number: yup.string().required('Iltimos. Ota-onaning telefon raqamini kitiring!'),
  firstname: yup.string().required('Iltimos. Ismni kitiring!'),
  lastname: yup.string().required('Iltimos. Familiyani kitiring!'),
  email: yup.string().required('Iltimos. Emailni kitiring!'),
  password: yup.string().required('Iltimos. Parolni kitiring!'),
})

const onSubmit = (student) => {
  if (gender.value === '') {
    iziToast.error({
      message: 'Iltimos, jinsni tanlang!',
      position: 'topRight',
    })
  } else {
    student = {
      ...student,
      img: `https://ui-avatars.com/api/?name=${firstname.value}`,
      group_id: group_id.value,
      gender: gender.value,
    }
    store.dispatch('student/create', student).then(
      () => {
        iziToast.success({
          message: 'O`quvchi muvaffaqiyatli qo`shildi!',
          position: 'topRight',
        })
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