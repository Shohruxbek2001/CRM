<script setup>
import {ErrorMessage, Field, Form} from 'vee-validate'
import * as yup from 'yup'
import {useStore} from 'vuex'
import iziToast from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'
import {ref} from "vue";

const store = useStore()

const firstname = ref('')
const lastname = ref('')
const phone_number = ref('')
const email = ref('')
const password = ref('')
const img = ref('')
const country_code = ref('')
const group_id = ref('')


const schema = yup.object().shape({
  email: yup.string().required('Iltimos. Emailni kitiring!'),
  password: yup.string().required('Iltimos. Parolni kitiring!'),
})

const onSubmit = (student) => {
  if (group_id.value === '') {
    iziToast.error({
      message: 'Iltimos, guruhni tanlang!',
      position: 'topRight',
    })
  } else {
    student = {
      ...student,
      group_id: group_id.value
    }
    console.log(student)
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

<template>
  <div class="grid grid-flow-row-dense gap-4 p-3">
    <div class=" border-2 shadow rounded-lg">
      <h1 class="font-bold text-3xl p-3 px-5">O'quvchi qo'shish</h1>
      <hr>
      <div class="flex items-center p-3 px-5">
        <Form @submit="onSubmit" :validation-schema="schema">
          <Field
              name="firstname"
              type="text"
              placeholder="Ism kiriting..."
              v-model="firstname"
              class="border rounded block p-2 outline-0 mb-4 w-96"
          />
          <ErrorMessage name="firstname" class="error-feedback text-red-600 font-medium"/>
          <div class="mb-6">
            <Field
                name="email"
                type="email"
                placeholder="email@email.com"
                v-model="email"
                class="border rounded block p-2 outline-0 mb-4 w-96"
            />
            <ErrorMessage name="email" class="error-feedback text-red-600 font-medium"/>
          </div>
          <div class="mb-6">
            <Field
                name="password"
                type="password"
                placeholder="password"
                v-model="password"
                class="border rounded block p-2 outline-0 mb-4 w-96"
            />
            <ErrorMessage name="password" class="error-feedback text-red-600 font-medium"/>
          </div>
          <select name="group" class="border p-2 rounded w-96 mb-6" v-model="group_id">
            <option value="" selected>Guruhni tanlang</option>
            <option value="0319e0a8-2509-417d-8fe0-637f009a15f7">Test</option>
          </select>
          <button type="submit"
                  class="w-96 p-2 text-center bg-green-500 text-white rounded text-xl hover:bg-green-600 focus:border focus:border-gray-600">
            Qo`shish
          </button>
        </Form>
      </div>
    </div>
  </div>
</template>