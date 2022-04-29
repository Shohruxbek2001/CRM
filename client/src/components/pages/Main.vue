<template>
  <div class="grid grid-cols-4 gap-4 px-3 mb-5">
    <router-link to="/abzor/new-students" @click="changeChildPage('NewStudents')"
                 :class="{'child-active': childPage === 'NewStudents' || $router.currentRoute.value.path === '/abzor/new-students' }"
                 class="border-2 shadow rounded-lg p-3 text-center hover:shadow-lg">
      <div class="text-lg m-3">Новые студенты <p class="font-medium mt-6 font-semibold text-3xl">10</p></div>
    </router-link>
    <router-link to="/abzor/leave-students" @click="changeChildPage('LeaveStudents')"
                 :class="{'child-active': childPage === 'LeaveStudents' || $router.currentRoute.value.path === '/abzor/leave-students' }"
                 class="border-2 shadow rounded-lg p-3 text-center hover:shadow-lg">
      <div class="text-lg m-3">Уходящие студенты <p class="font-medium mt-6 font-semibold text-3xl">12</p>
      </div>
    </router-link>
    <router-link to="/abzor/students-comments" @click="changeChildPage('StudentsComments')"
                 :class="{'child-active': childPage === 'StudentsComments' || $router.currentRoute.value.path === '/abzor/students-comments' }"
                 class="border-2 shadow rounded-lg p-3 text-center hover:shadow-lg">
      <div class="text-lg m-3">Комментарии студентов <p class="font-medium mt-6 font-semibold text-3xl">20</p></div>
    </router-link>
    <router-link to="/abzor/all-students" @click="changeChildPage('AllStudents')"
                 :class="{'child-active': childPage === 'AllStudents' || $router.currentRoute.value.path === '/abzor/all-students' }"
                 class="border-2 shadow rounded-lg p-3 text-center hover:shadow-lg">
      <div class="text-lg m-3">Все студенты <p class="font-medium mt-6 font-semibold text-3xl">45</p></div>
    </router-link>
  </div>
  <div class="p-3">
    <router-view/>
  </div>
</template>

<script>
import {useStore} from "vuex";
import {computed} from "vue";

export default {
  setup() {
    const store = useStore()

    let childPage = computed(() => {
      return store.state.selectedChildPage
    })

    const changeChildPage = (page) => {
      store.commit('setSelectedChildPage', page)
    }

    return {
      childPage,
      changeChildPage
    }
  }
}
</script>

<style scoped>

</style>