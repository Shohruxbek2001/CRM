<template>
  <div class="p-3">
    <div class="border-2 shadow rounded-lg">
      <div class="flex justify-between items-center p-3">
        <h1 class="font-bold text-2xl">Admin boshqaruvi</h1>
        <i @click="openModal()" class="fa fa-user-plus cursor-pointer"></i>
      </div>
      <hr />
      <div class="p-3">
        <table class="w-full text-sm text-left text-gray-500 mb-3">
          <thead class="text-xs text-gray-700 uppercase border-b">
            <tr>
              <th scope="col" class="px-6 py-3">№</th>
              <th scope="col" class="px-2 py-3">Name</th>
              <th scope="col" class="px-2 py-3">Email</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(admin, index) in admins.filter((a) => a.role !== 'super')" :key="index" class="bg-white border-b hover:bg-gray-50">
              <td class="px-6 text-xl text-black">{{ index + 1 }}</td>
              <TableItem :admin="admin" />
              <td class="p-4 text-right">
                <i class="fa fa-user-pen cursor-pointer hover:text-blue-600"></i>
                <i @click="onDelete(admin.id)" title="Delete Admin" class="fa fa-trash cursor-pointer hover:text-red-600 ml-2"></i>
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
              <Field name="firstname" type="text" placeholder="Ism kiriting..." v-model="name" class="border rounded block p-2 outline-0 mb-4 w-full" />
              <ErrorMessage name="firstname" class="error-feedback text-red-600 font-medium" />
              <div class="mb-6">
                <Field name="email" type="email" placeholder="email@email.com" v-model="email" class="border rounded block p-2 outline-0 mb-4 w-full" />
                <ErrorMessage name="email" class="error-feedback text-red-600 font-medium" />
              </div>
              <div class="mb-6">
                <Field name="password" type="password" placeholder="password" v-model="password" class="border rounded block p-2 outline-0 mb-4 w-full" />
                <ErrorMessage name="password" class="error-feedback text-red-600 font-medium" />
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
import 'izitoast/dist/css/iziToast.min.css'
import { computed, onMounted, reactive } from 'vue'
import iziToast from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'
import TableItem from '../pages/main_parts/Table/TableItemForAdmins.vue'
import $ from 'jquery'
import AdminService from '../../services/admin.service'

const store = useStore()

const data = reactive({
  admins: [],
  name: '',
  email: '',
  password: '',
  schema: yup.object().shape({
    firstname: yup.string().required('Ism kiriting...'),
    email: yup.string().email('Email not valid').required('Email kiriting...'),
    password: yup.string().required('Parol kiriting...')
  })
})

const admins = computed(() => {
  return store.state.admins
})
const addAdminsInStore = () => {
  AdminService.getAllAdmins().then((data) => store.commit('setAdmins', data))
}
const openModal = (student) => {
  $('#popup-modal').removeClass('hidden')
}
const closeModal = () => {
  $('#popup-modal').addClass('hidden')
}
onMounted(() => {
  addAdminsInStore()
})
const onSubmit = (admin) => {
  store.dispatch('admin/create', admin).then(
    () => {
      iziToast.success({
        message: 'Admin muvaffaqiyatli qo`shildi!',
        position: 'topRight',
      })
      data.name = ''
      data.email = ''
      data.password = ''
      addAdminsInStore()
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

const onDelete = (id) => {
  store.dispatch('admin/delete', id).then(
    () => {
      iziToast.success({
        message: 'Admin muvaffaqiyatli o`chirildi!',
        position: 'topRight',
      })
      addAdminsInStore()
    },
    (error) => {
      iziToast.error({
        message: (error.response && error.response.data && error.response.data.message) || error.message || error.toString(),
        position: 'topRight',
      })
    }
  )
}
</script>