<template>
  <div v-if="login">
    <div class="w-screen">
      <Sidebar/>
      <div class="ml-60">
        <Navbar/>
        <router-view/>
      </div>
    </div>
  </div>
  <div v-if="!login">
    <router-view/>
  </div>
</template>
<script>
import Sidebar from './components/layout/Sidebar.vue'
import Navbar from './components/layout/Navbar.vue'
import {useStore} from "vuex";
import {computed} from "vue";

export default {
  components: {
    Sidebar,
    Navbar
  },
  setup() {
    const store = useStore()

    let login = computed(() => {
      return store.state.isLogin
    })

    return {
      login
    }
  }
}
</script>

<style>
</style>