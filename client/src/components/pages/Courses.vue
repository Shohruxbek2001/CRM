<template>
  <div class="p-3 pr-7 overflow-x-hidden">
    <div class="border-2 shadow rounded-lg">
      <h1 class="font-bold text-3xl py-3 px-5">Kurs va narxlarni boshqarish</h1>
      <hr />
      <div class="p-3">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <Form @submit="onSubmit" :validation-schema="schema">
              <label for="course_name">Kurs nomi</label>
              <Field name="course_name" type="text" placeholder="Kurs nomi..." v-model="course_name" class="border rounded block p-2 outline-0 mb-4 w-full" />
              <ErrorMessage name="course_name" class="error-feedback text-red-600 font-medium" /><br />
              <label for="duration">Kurs davomiyligi</label>
              <Field name="duration" type="number" min="1" placeholder="2" v-model="duration" class="border rounded block p-2 outline-0 mb-4 w-20" />
              <ErrorMessage name="duration" class="error-feedback text-red-600 font-medium" /><br />
              <label for="per_lesson">Bitta dars davomiyligi</label>
              <Field name="per_lesson" type="number" min="1" placeholder="1" v-model="per_lesson" class="border rounded block p-2 outline-0 mb-4 w-20" />
              <ErrorMessage name="per_lesson" class="error-feedback text-red-600 font-medium" /><br />
              <label for="start_date">Kurs boshlanadigan sana</label>
              <Field name="start_date" type="datetime-local" v-model="start_date" class="border rounded block p-2 outline-0 mb-4 w-72" />
              <ErrorMessage name="start_date" class="error-feedback text-red-600 font-medium" /><br />
              <label for="price">Kurs narxi</label>
              <select name="price_id" class="border p-2 rounded w-full mb-6" v-model="price_id">
                <option value="" selected>Kurs narxi...</option>
                <option v-for="price in prices" :value="price.id" :key="price.id">{{ price.price }}</option>
              </select>
              <label for="price">Filial nomi</label>
              <select name="branch_id" class="border p-2 rounded w-full mb-6" v-model="branch_id">
                <option value="" selected>Filial nomi...</option>
                <option v-for="branch in branches" :value="branch.id" :key="branch.id">{{ branch.name }}</option>
              </select>
              <button type="submit" class="w-72 p-2 mb-3 text-center block bg-green-500 text-white rounded text-xl hover:bg-green-600 focus:border focus:border-gray-600">Kurs qo'shish</button>
            </Form>
          </div>
          <div>
            <Form @submit="onSubmitPrice" :validation-schema="priceSchema">
              <label for="price_">Narx</label>
              <Field name="price" type="text" placeholder="350000,00" v-model="price" class="border rounded block p-2 outline-0 mb-4 w-full" />
              <ErrorMessage name="price" class="error-feedback text-red-600 font-medium" />
              <button type="submit" class="w-72 p-2 mb-3 text-center block bg-green-500 text-white rounded text-xl hover:bg-green-600 focus:border focus:border-gray-600">Qo'shish</button>
            </Form>
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 overflow-y-auto h-28">
              <thead class="text-xs text-gray-700 uppercase dark:text-gray-400 border-b">
                <tr class="text-left">
                  <th scope="col" class="px-2 py-3">№</th>
                  <th scope="col" class="p-3">Kurs nomi</th>
                  <th scope="col" class="p-3">Davomiyligi</th>
                  <th scope="col" class="p-3">Narxi</th>
                  <th scope="col" class="p-3">Filial nomi</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="course of courses" :key="course.id" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th class="w-13 p-2 text-center">
                    {{ courses.indexOf(course) + 1 }}
                  </th>
                  <td scope="row" class="p-4 font-medium text-gray-900 dark:text-white whitespace-nowrap text-left">
                    <p class="text-sm leading-5 font-medium text-gray-900 dark:text-white">
                      {{ course.name }}
                    </p>
                  </td>
                  <td scope="row" class="p-4 font-medium text-gray-900 dark:text-white whitespace-nowrap text-left">
                    <p class="text-sm leading-5 font-medium text-gray-900 dark:text-white">
                      {{ course.duration }} oy
                    </p>
                  </td>
                  <td scope="row" class="p-4 font-medium text-gray-900 dark:text-white whitespace-nowrap text-left">
                    <p class="text-sm leading-5 font-medium text-gray-900 dark:text-white">
                      {{ prices.filter((b) => b.id === course.price_list_id)[0]['price'] }}
                    </p>
                  </td>
                  <td scope="row" class="p-4 font-medium text-gray-900 dark:text-white whitespace-nowrap text-left">
                    <p class="text-sm leading-5 font-medium text-gray-900 dark:text-white">
                      {{ branches.filter((b) => b.id === course.branch_id)[0]['name'] }}
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

onMounted(() => {
  addBranchesInStore(), addPricesInStore(), addCoursesInStore()
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