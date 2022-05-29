<template>
  <div class="p-3">
    <div class="border-2 shadow rounded-lg">
      <h1 class="font-bold text-3xl p-3 px-5">O'qituvchi qo'shish</h1>
      <hr />
      <div class="p-3 px-5">
        <div class="grid grid-cols-2 gap-4">
          <div>
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
              <div class="flex justify-end">
                <button type="submit" class="w-72 p-2 text-center block bg-green-500 text-white rounded text-xl hover:bg-green-600 focus:border focus:border-gray-600">Qo'shish</button>
              </div>
            </Form>
          </div>
          <div>
            <table class="w-full text-sm text-left text-gray-500 overflow-y-auto h-28">
              <thead class="text-xs text-gray-700 uppercase border-b">
                <tr class="text-left">
                  <th scope="col" class="px-2 py-3">№</th>
                  <th scope="col" class="p-3">O'qituvchi nomi</th>
                  <th scope="col" class="p-3">Telefon raqami</th>
                  <th scope="col" class="p-3">Guruh</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(teacher, index) of teachers" :key="index" class="bg-white border-b hover:bg-gray-50">
                  <th class="w-13 p-2 text-center">
                    {{ index + 1 }}
                  </th>
                  <td scope="row" class="p-4 font-medium text-gray-900 whitespace-nowrap text-left">
                    <p class="text-sm leading-5 font-medium text-gray-900">
                      {{ teacher.firstname + ' ' + teacher.lastname }}
                    </p>
                  </td>
                  <td scope="row" class="p-4 font-medium text-gray-900 whitespace-nowrap text-left">
                    <p class="text-sm leading-5 font-medium text-gray-900">
                      {{ teacher.phone_number }}
                    </p>
                  </td>
                  <td scope="row" class="p-4 font-medium text-gray-900 whitespace-nowrap text-left">
                    <p class="text-sm leading-5 font-medium text-gray-900">
                      {{ groups.filter((b) => b.id === teacher.group_id)[0]['name'] }}
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
  if (group_id.value === '') {
    iziToast.error({
      message: 'Iltimos, guruhni tanlang!',
      position: 'topRight',
    })
  } else if (gender.value === '') {
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