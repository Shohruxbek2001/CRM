<template>
  <div class="p-3 pr-7 overflow-x-hidden">
    <div class="border-2 shadow rounded-lg">
      <h1 class="font-bold text-3xl py-3 px-5">Filial va Xonalarni boshqarish</h1>
      <hr />
      <div class="p-3">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <Form @submit="onSubmit" :validation-schema="schema">
              <label for="branch_name">Filial nomi</label>
              <Field name="branch_name" type="text" placeholder="Urganch..." v-model="branch_name" class="border rounded block p-2 outline-0 mb-4 w-full" />
              <ErrorMessage name="branch_name" class="error-feedback text-red-600 font-medium" />
              <button type="submit" class="w-72 p-2 mb-3 text-center block bg-green-500 text-white rounded text-xl hover:bg-green-600 focus:border focus:border-gray-600">Fillial qo'shish</button>
              <hr />
              <table class="w-full text-sm text-left text-gray-500">
                <thead class="text-xs text-gray-700 uppercase dark:text-gray-400 border-b">
                  <tr class="text-center">
                    <th scope="col" class="px-2 py-3">№</th>
                    <th scope="col" class="px-6 py-3">Filial nomi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="branch of branches" :key="branch.id" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th class="w-13 p-2 text-center">
                      {{ branches.indexOf(branch) + 1 }}
                    </th>
                    <td scope="row" class="p-4 font-medium text-gray-900 dark:text-white whitespace-nowrap text-left">
                      <p class="text-sm leading-5 font-medium text-gray-900 dark:text-white">
                        {{ branch.name }}
                      </p>
                    </td>
                    <td class="px-6 py-4 text-right">
                      <i class="fa fa-pencil cursor-pointer hover:text-blue-600" data-modal-toggle="editStudentModal"></i>
                      <i title="Add archive" class="fa fa-archive cursor-pointer hover:text-orange-600 ml-2"></i>
                    </td>
                  </tr>
                </tbody>
              </table>
            </Form>
          </div>
          <div>
            <Form @submit="onSubmitRoom" :validation-schema="roomSchema">
              <Field name="room_name" type="text" placeholder="215 a..." v-model="room_name" class="border rounded block p-2 outline-0 mb-4 w-full" />
              <ErrorMessage name="room_name" class="error-feedback text-red-600 font-medium" />
              <Field name="room_amount" type="number" min="0" placeholder="15" v-model="room_amount" class="border rounded block p-2 outline-0 w-20" />
              <ErrorMessage name="room_amount" class="error-feedback text-red-600 font-medium" /><br />
              <label for="branch">Filial nomi</label><br />
              <select name="branch" v-model="branch_id" class="border p-2 rounded w-full mb-6">
                <option value="" selected>Tanlang...</option>
                <option v-for="branch in branches" :value="branch.id" :key="branch.id">{{ branch.name }}</option>
              </select>
              <button type="submit" class="w-72 p-2 mb-3 text-center block bg-green-500 text-white rounded text-xl hover:bg-green-600 focus:border focus:border-gray-600">Xona qo'shish</button>
              <hr />
              <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 overflow-y-auto h-28">
                <thead class="text-xs text-gray-700 uppercase dark:text-gray-400 border-b">
                  <tr class="text-center">
                    <th scope="col" class="px-2 py-3">№</th>
                    <th scope="col" class="px-6 py-3">Xona nomi</th>
                    <th scope="col" class="px-6 py-3">Sig'imi</th>
                    <th scope="col" class="px-6 py-3">Filial</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="room of rooms" :key="room.id" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th class="w-13 p-2 text-center">
                      {{ rooms.indexOf(room) + 1 }}
                    </th>
                    <td scope="row" class="p-4 font-medium text-gray-900 dark:text-white whitespace-nowrap text-left">
                      <p class="text-sm leading-5 font-medium text-gray-900 dark:text-white">
                        {{ room.name }}
                      </p>
                    </td>
                    <td scope="row" class="p-4 font-medium text-gray-900 dark:text-white whitespace-nowrap text-left">
                      <p class="text-sm leading-5 font-medium text-gray-900 dark:text-white">
                        {{ room.amount }}
                      </p>
                    </td>
                    <td scope="row" class="p-4 font-medium text-gray-900 dark:text-white whitespace-nowrap text-left">
                      <p class="text-sm leading-5 font-medium text-gray-900 dark:text-white">
                        {{ branches.filter((b) => b.id === room.branch_id)[0]['name'] }}
                      </p>
                    </td>
                    <td class="px-6 py-4 text-right">
                      <i class="fa fa-pencil cursor-pointer hover:text-blue-600" data-modal-toggle="editStudentModal"></i>
                      <i title="Add archive" class="fa fa-archive cursor-pointer hover:text-orange-600 ml-2"></i>
                    </td>
                  </tr>
                </tbody>
              </table>
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
import BranchService from '../../services/branch.service'
import RoomService from '../../services/room.service'

const store = useStore()

const branch_name = ref('')
const room_name = ref('')
const room_amount = ref('')
const branch_id = ref('')

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
  if (branch_id.value === '') {
    iziToast.error({
      message: 'Iltimos, Filialni tanlang!',
      position: 'topRight',
    })
  } else {
    room.room_amount = Number(room.room_amount)
    room = {
      ...room,
      branch_id: branch_id.value
    }
    store.dispatch('room/create', room).then(
      () => {
        iziToast.success({
          message: 'Xona muvaffaqiyatli qo`shildi!',
          position: 'topRight',
        })
        addRoomsInStore()
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