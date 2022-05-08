<template>
  <div class="w-60 h-screen shadow-md bg-gray-900 fixed" id="sidenavSecExample">
    <div class="pt-4 pb-2 px-6 mt-4">
      <router-link to="/">
        <div class="flex items-center">
          <div class="shrink-0">
            <img src="https://mdbcdn.b-cdn.net/img/new/avatars/8.webp" class="rounded-full w-10" alt="Avatar"/>
          </div>
          <div class="grow ml-3">
            <p class="text-sm font-semibold text-gray-400 uppercase hover:text-gray-200 transition duration-300 ease-in-out">
              Admin Dashboard</p>
          </div>
        </div>
      </router-link>
    </div>
    <ul class="relative mt-5">
      <li class="relative" v-for="menu of menus" :key="menu">
        <MenuItem :menu="menu"/>
      </li>
    </ul>
  </div>
</template>

<script>
import MenuItem from "./MenuItem.vue";

export default {
  data() {
    return {
      menus: [
        {id: 1, url: "/", icon: "fa-pie-chart", name: "Обзор"},
        {id: 2, url: "/prognoz", icon: "fa-magnifying-glass-plus", name: "Прогноз выгоды"},
        {id: 3, url: "/uchet", icon: "fa-coins", name: "Бухгалтерский учет"},
        {id: 4, url: "/tranzaksiya", icon: "fa-chart-column", name: "Сумма транзакций"},
        {id: 5, url: "/udachi", icon: "fa-user-plus", name: "Удачи"},
        {id: 6, url: "/doxod", icon: "fa-sack-dollar", name: "Доход"},
        {id: 7, url: "/groups", icon: "fa-user-group", name: "Guruhlar"},
        {id: 8, url: "/branches", icon: "fa-building", name: "Filiallar"},
        {id: 9, url: "/courses", icon: "fa-book", name: "Kurslar"},
        {id: 10, url: "/teachers", icon: "fa-chalkboard-user", name: "O'qituvchilar"}
      ]
    }
  },
  components: {
    MenuItem
  }
}
</script>

<style scoped>
.active {
  border-left-width: 4px;
  --tw-text-opacity: 1;
  color: rgb(229 231 235 / var(--tw-text-opacity));
  border-color: rgb(229 231 235 / var(--tw-text-opacity));
  background-color: rgb(31 41 55 / 0.3);
}
</style>