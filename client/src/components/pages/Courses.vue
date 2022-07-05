<template>
  <div class="p-3 pr-7 overflow-x-hidden">
    <div class="border-2 shadow rounded-lg">
      <div class="flex justify-between items-center px-3">
        <h1 class="font-bold text-2xl py-3">Kurs va narxlarni boshqarish</h1>
        <i @click="openModal()"
           class="fa fa-plus cursor-pointer font-serif uppercase font-light p-3 rounded bg-green-500 text-white hover:bg-green-700">
          kurs qo'shish</i>
      </div>
      <hr/>
      <div class="p-3">
        <table class="w-full text-sm text-left text-gray-500 overflow-y-auto h-28">
          <thead class="text-xs text-gray-700 uppercase border-b">
          <tr class="text-left">
            <th scope="col" class="p-3 text-center">№</th>
            <th scope="col" class="p-3">Kurs nomi</th>
            <th scope="col" class="p-3">Davomiyligi</th>
            <th scope="col" class="p-3">Narxi</th>
            <th scope="col" class="p-3">Filial nomi</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(course, index) of courses" :key="index" class="bg-white border-b hover:bg-gray-50">
            <th class="w-13 p-2 text-center">
              {{ index + 1 }}
            </th>
            <td  class="p-4 font-medium text-gray-900 whitespace-nowrap text-left">
              <p class="text-sm leading-5 font-medium text-gray-900">
                {{ course.name }}
              </p>
            </td>
            <td  class="p-4 font-medium text-gray-900 whitespace-nowrap text-left">
              <p class="text-sm leading-5 font-medium text-gray-900">{{ course.duration }} oy</p>
            </td>
            <td  class="p-4 font-medium text-gray-900 whitespace-nowrap text-left">
              <p class="text-sm leading-5 font-medium text-gray-900">
                {{ prices.map((b) => b.id === course.price_list_id ? b.price : null).filter((b) => b !== null)[0] }}
                so'm
              </p>
            </td>
            <td  class="p-4 font-medium text-gray-900 whitespace-nowrap text-left">
              <p class="text-sm leading-5 font-medium text-gray-900">
                {{ branches.map((b) => b.id === course.branch_id ? b.name : null).filter((b) => b !== null)[0] }}
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
    <div id="popup-modal" tabindex="-1"
         class="hidden overflow-y-auto w-full overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex items-center justify-center md:inset-0 h-modal md:h-full">
      <div class="relative p-4 w-full max-w-2xl h-full md:h-auto">
        <div class="relative bg-white rounded-lg shadow-lg border-2 dark:bg-gray-700">
          <button type="button" @click="closeModal()"
                  class="absolute top-3 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                  data-modal-toggle="popup-modal">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"></path>
            </svg>
          </button>
          <div class="p-5 pt-8">
            <div>
              <Form @submit="onSubmit" :validation-schema="schema">
                <label for="course_name">Kurs nomi</label>
                <Field name="course_name" type="text" placeholder="Kurs nomi..." v-model="course_name"
                       class="border rounded block p-2 outline-0 w-full"/>
                <ErrorMessage name="course_name" class="error-feedback text-red-600 font-medium"/>
                <br/>
                <div class="grid grid-cols-2">
                  <div>
                    <label for="duration">Kurs davomiyligi</label>
                    <Field name="duration" type="number" min="1" placeholder="2" v-model="duration"
                           class="border rounded block p-2 outline-0 w-20"/>
                    <ErrorMessage name="duration" class="error-feedback text-red-600 font-medium"/>
                    <br/>
                  </div>
                  <div>
                    <label for="per_lesson">Bitta dars davomiyligi</label>
                    <Field name="per_lesson" type="number" min="1" placeholder="1" v-model="per_lesson"
                           class="border rounded block p-2 outline-0 w-20"/>
                    <ErrorMessage name="per_lesson" class="error-feedback text-red-600 font-medium"/>
                    <br/>
                  </div>
                </div>
                <label for="start_date">Kurs boshlanadigan sana</label>
                <Field name="start_date" type="datetime-local" v-model="start_date"
                       class="border rounded block p-2 outline-0 w-72"/>
                <ErrorMessage name="start_date" class="error-feedback text-red-600 font-medium"/>
                <br/>
                <label for="price">Kurs narxi</label>
                <select name="price_id" class="border p-2 rounded w-full mb-6" v-model="price_id">
                  <option value="" selected>Kurs narxi...</option>
                  <option v-for="(price, index) in prices" :value="price.id" :key="index">{{ price.price }}</option>
                </select>
                <label for="price">Filial nomi</label>
                <select name="branch_id" class="border p-2 rounded w-full mb-6" v-model="branch_id">
                  <option value="" selected>Filial nomi...</option>
                  <option v-for="(branch, index) in branches" :value="branch.id" :key="index">{{ branch.name }}</option>
                </select>
                <button type="submit"
                        class="w-full p-2 mb-3 text-center block bg-green-500 text-white rounded text-xl hover:bg-green-600 focus:border focus:border-gray-600">
                  Kurs qo'shish
                </button>
              </Form>
              <hr/>
            </div>
            <div>
              <Form @submit="onSubmitPrice" :validation-schema="priceSchema" class="mt-3">
                <label for="price_">Narx</label>
                <div class="flex justify-start items-center">
                  <Field name="price" type="text" placeholder="350000,00" v-model="price"
                         class="border block p-2 outline-0 w-52"/>
                  <button type="submit"
                          class="w-14 p-1 text-center block bg-blue-500 text-white rounded text-3xl hover:bg-blue-600 focus:border focus:border-gray-600">
                    +
                  </button>
                </div>
                <ErrorMessage name="price" class="error-feedback text-red-600 font-medium"/>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ErrorMessage, Field, Form} from 'vee-validate'
import * as yup from 'yup'
import {useStore} from 'vuex'
import $ from 'jquery'
import iziToast from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'
import {computed, onBeforeMount, ref} from 'vue'
import BranchService from '../../services/branch.service'
import PriceService from '../../services/price.service'
import CourseService from '../../services/course.service'

const store = useStore()

const course_name = ref('')
const duration = ref('')
const price_id = ref('')
const per_lesson = ref('')
const start_date = ref('')
const price = ref('')
const branch_id = ref('')

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
const prices = computed(() => {
  return store.state.prices
})
const addPricesInStore = () => {
  PriceService.getAllPrices().then((data) => store.commit('setPrices', data))
}
const courses = computed(() => {
  return store.state.courses
})
const addCoursesInStore = () => {
  CourseService.getAllCourses().then((data) => store.commit('setCourses', data))
}

onBeforeMount(() => {
  addBranchesInStore()
  addPricesInStore()
  addCoursesInStore()
})

const schema = yup.object().shape({
  course_name: yup.string().required('Iltimos. Kurs nomini kiriting!'),
  duration: yup.string().required('Iltimos. Kurs davomiyligini kiriting!'),
  per_lesson: yup.string().required('Iltimos. Bitta kurs davomiyligini kiriting!'),
  start_date: yup.string().required('Iltimos. Kurs boshlanadigan sanani kiriting!'),
})

const priceSchema = yup.object().shape({
  price: yup.string().required('Iltimos. Narxni kiriting!'),
})

const onSubmit = (course) => {
  if (price_id.value === '') {
    iziToast.error({
      message: 'Iltimos, kurs narxini tanlang!',
      position: 'topRight',
    })
  } else if (branch_id.value === '') {
    iziToast.error({
      message: 'Iltimos, filialni tanlang!',
      position: 'topRight',
    })
  } else {
    course = {
      ...course,
      price_id: price_id.value,
      branch_id: branch_id.value,
    }
    store.dispatch('course/create', course).then(
        () => {
          iziToast.success({
            message: 'Kurs muvaffaqiyatli qo`shildi!',
            position: 'topRight',
          })
          addCoursesInStore()
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
const onSubmitPrice = (price) => {
  store.dispatch('price/create', price).then(
      () => {
        iziToast.success({
          message: 'Narx muvaffaqiyatli qo`shildi!',
          position: 'topRight',
        })
        addPricesInStore()
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