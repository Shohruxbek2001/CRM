<template>
  <div>
    <div class="grid grid-cols-4 gap-4 px-3 mb-5">
      <router-link to="/abzor/new-students" @click="changeChildPage('NewStudents')" :class="{ 'child-active': childPage === 'NewStudents' || $router.currentRoute.value.path === '/abzor/new-students' }" class="border-2 shadow rounded-lg p-3 text-center hover:shadow-lg">
        <div class="text-lg m-3">
          Новые студенты
          <p class="font-medium mt-6 text-3xl">{{ students.length }}</p>
        </div>
      </router-link>
      <router-link to="/abzor/leave-students" @click="changeChildPage('LeaveStudents')" :class="{ 'child-active': childPage === 'LeaveStudents' || $router.currentRoute.value.path === '/abzor/leave-students' }" class="border-2 shadow rounded-lg p-3 text-center hover:shadow-lg">
        <div class="text-lg m-3">
          Уходящие студенты
          <p class="font-medium mt-6 text-3xl">0</p>
        </div>
      </router-link>
      <router-link to="/abzor/students-comments" @click="changeChildPage('StudentsComments')" :class="{ 'child-active': childPage === 'StudentsComments' || $router.currentRoute.value.path === '/abzor/students-comments' }" class="border-2 shadow rounded-lg p-3 text-center hover:shadow-lg">
        <div class="text-lg m-3">
          Комментарии студентов
          <p class="font-medium mt-6 text-3xl">0</p>
        </div>
      </router-link>
      <router-link to="/abzor/all-students" @click="changeChildPage('AllStudents')" :class="{ 'child-active': childPage === 'AllStudents' || $router.currentRoute.value.path === '/abzor/all-students' }" class="border-2 shadow rounded-lg p-3 text-center hover:shadow-lg">
        <div class="text-lg m-3">
          Все студенты
          <p class="font-medium mt-6 text-3xl">{{ students.length }}</p>
        </div>
      </router-link>
    </div>
    <div class="p-3">
      <router-view />
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed, onMounted } from 'vue'
import StudentService from "../../services/student.service";

export default {
  setup() {
    const store = useStore()

    let childPage = computed(() => {
      return store.state.selectedChildPage
    })

    let students = computed(() => {
      return store.state.students
    })

    const changeChildPage = (page) => {
      store.commit('setSelectedChildPage', page)
    }
    const addStudentsInStore = () => {
      StudentService.getAllStudents().then((data) => store.commit('setStudents', data))
    }
    onMounted(() => {
      addStudentsInStore()
    })
    return {
      childPage,
      changeChildPage,
      students,
    }
  },
}
</script>

<style scoped>
.child-active {
  border-color: red;
}

.child-active p {
  color: red;
}

body {
  overflow-x: hidden !important;
}
</style>