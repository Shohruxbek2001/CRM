<template>
  <div class="p-3 pr-7 overflow-x-hidden">
    <div class="border-2 shadow rounded-lg">
      <div class="flex justify-between items-center px-3">
        <h1 class="font-bold text-2xl py-3">Filial va Xonalarni boshqarish</h1>
        <i @click="openModal()" class="fa fa-plus cursor-pointer font-serif uppercase font-light p-3 rounded bg-green-500 text-white hover:bg-green-700"> Xona qo'shish</i>
      </div>
      <hr />
      <div class="p-3">
        <div class="flex justify-end items-center relative">
          <div @click="toggleSortDropdown" id="dropdownBtn" class="sort-btn mb-3 cursor-pointer text-gray-500 hover:text-gray-900">Saralash <i class="fa fa-chevron-down text-sm"></i></div>
          <div id="dropdownForSort" class="z-10 hidden top-7 right-0 absolute bg-white divide-y divide-gray-100 rounded shadow-lg transition ease-in duration-200 w-44 dark:bg-gray-700">
            <ul class="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefault">
              <li @click="toggleSortDropdown">
                <a href="#" class="block px-4 py-2 hover:bg-gray-100">Sig'im bo'yicha o'sish</a>
              </li>
              <li @click="toggleSortDropdown">
                <a href="#" class="block px-4 py-2 hover:bg-gray-100">Sig'im bo'yicha kamayish</a>
              </li>
            </ul>
          </div>
        </div>
        <hr />
        <table class="w-full text-sm text-left text-gray-500 overflow-y-auto h-28">
          <thead class="text-xs text-gray-700 uppercase border-b">
            <tr>
              <th scope="col" class="px-2 py-3 text-center">№</th>
              <th scope="col" class="p-3">Xona nomi</th>
              <th scope="col" class="p-3">Xona sig'imi</th>
              <th scope="col" class="p-3">Filial nomi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(room, index) of rooms" :key="index" class="bg-white border-b hover:bg-gray-50">
              <th class="w-13 p-2 text-center">
                {{ index + 1 }}
              </th>
              <td scope="row" class="p-4 font-medium text-gray-900 whitespace-nowrap text-left">
                <p class="text-sm leading-5 font-medium text-gray-900">
                  {{ room.name }}
                </p>
              </td>
              <td scope="row" class="p-4 font-medium text-gray-900 whitespace-nowrap text-left">
                <p class="text-sm leading-5 font-medium text-gray-900">
                  {{ room.amount }}
                </p>
              </td>
              <td scope="row" class="p-4 font-medium text-gray-900 whitespace-nowrap text-left">
                <p class="text-sm leading-5 font-medium text-gray-900">
                  {{ branches.map((b) => (b.id === room.branch_id ? b.name : null)).filter((i) => i !== null)[0] }}
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
            <Form @submit="onSubmit" :validation-schema="schema">
              <label for="branch_name">Filial nomi</label>
              <Field name="branch_name" type="text" placeholder="Urganch..." v-model="branch_name" class="border rounded block p-2 outline-0 mb-4 w-full" />
              <ErrorMessage name="branch_name" class="error-feedback text-red-600 font-medium" />
              <button type="submit" class="w-full p-2 mb-3 text-center block bg-green-500 text-white rounded text-xl hover:bg-green-600 focus:border focus:border-gray-600">Fillial qo'shish</button>
            </Form>
            <hr class="my-3" />
            <Form @submit="onSubmitRoom" :validation-schema="roomSchema">
              <Field name="room_name" type="text" placeholder="215 a..." v-model="room_name" class="border rounded block p-2 outline-0 mb-4 w-full" />
              <ErrorMessage name="room_name" class="error-feedback text-red-600 font-medium" />
              <Field name="room_amount" type="number" min="0" placeholder="15" v-model="room_amount" class="border rounded block p-2 outline-0 w-20" />
              <ErrorMessage name="room_amount" class="error-feedback text-red-600 font-medium" /><br />
              <label for="branch">Filial nomi</label><br />
              <select name="branch" v-model="branch_id" class="border p-2 rounded w-full mb-6">
                <option value="" selected>Tanlang...</option>
                <option v-for="(branch, index) in branches" :value="branch.id" :key="index">{{ branch.name }}</option>
              </select>
              <button type="submit" class="w-full p-2 text-center block bg-green-500 text-white rounded text-xl hover:bg-green-600 focus:border focus:border-gray-600">Xona qo'shish</button>
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
import { computed, onMounted, ref } from 'vue'
import BranchService from '../../services/branch.service'
import RoomService from '../../services/room.service'

const store = useStore()

const branch_name = ref('')
const room_name = ref('')
const room_amount = ref('')
const branch_id = ref('')

const toggleSortDropdown = () => {
  $('#dropdownForSort').toggleClass('hidden')
}
const openModal = () => {
  $('#popup-modal').removeClass('hidden')
}
const closeModal = () => {
  $('#popup-modal').addClass('hidden')
}
const branches = computed(() => {
  return store.state.branches
})
const addBranchesInStore = () => {
  BranchService.getAllBranches().then((data) => store.commit('setBranches', data))
}
const rooms = computed(() => {
  return store.state.rooms
})
const addRoomsInStore = () => {
  RoomService.getAllRooms().then((data) => store.commit('setRooms', data))
}
onMounted(() => {
  addBranchesInStore(), addRoomsInStore()
})

const schema = yup.object().shape({
  branch_name: yup.string().required('Iltimos. Filial nomini kiriting!'),
})

const roomSchema = yup.object().shape({
  room_name: yup.string().required('Iltimos. Xona nomini kiriting!'),
  room_amount: yup.string().required('Iltimos. Xona sig`imini kiriting!'),
})

const onSubmit = (branch_name) => {
  store.dispatch('branch/create', branch_name).then(
    () => {
      iziToast.success({
        message: 'Filial muvaffaqiyatli qo`shildi!',
        position: 'topRight',
      })
      addBranchesInStore()
    },
    (error) => {
      iziToast.error({
        message: (error.response && error.response.data && error.response.data.message) || error.message || error.toString(),
        position: 'topRight',
      })
    }
  )
}
const onSubmitRoom = (room) => {
  console.log(room)
  console.log(branch_id.value)
  if (branch_id.value === '') {
    iziToast.error({
      message: 'Iltimos, Filialni tanlang!',
      position: 'topRight',
    })
  } else {
    room.room_amount = Number(room.room_amount)
    room = {
      ...room,
      branch_id: branch_id.value,
    }
    store.dispatch('room/create', room).then(
      () => {
        iziToast.success({
          message: 'Xona muvaffaqiyatli qo`shildi!',
          position: 'topRight',
        })
        addRoomsInStore()
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