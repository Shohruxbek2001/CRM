<template>
  <div class="grid grid-flow-row-dense gap-4 text-gray-400 p-3">
    <div class="col-span-2 border-2 shadow rounded-lg text-center">
      <div class="text-sm font-medium text-center text-gray-500 border-b border-gray-200 px-3">
        <ul class="flex flex-wrap border-b border-gray-300">
          <li class="mr-2" @click="toggleTabs(1)">
            <a href="#" :class="{active: openTab === 1}"
               class="inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300">Заплатил
              деньги в Интернете</a>
          </li>
          <li class="mr-2" @click="toggleTabs(2)">
            <a href="#" :class="{active: openTab === 2}"
               class="inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300">Заплатил
              деньги в наличе</a>
          </li>
        </ul>
        <div class="content mt-6" v-for="(content, index) of contents" :key="index"
             :class="{'hidden': openTab !== content.id, 'block': openTab ===  content.id}">
          <TabContent :content="content"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TabContent from './doxod_parts/TabContent.vue'

export default {
  data() {
    return {
      openTab: 1,
      contents: [
        {
          id: 1, cards: [
            {
              id: 1,
              name: "Jackson",
              status: "Some text",
              body: "lorem ipsum dolor sit amet",
              sum: "300000,00",
              date: "01.01.2020",
              phone: "8 800 555 35 35"
            },
            {
              id: 2,
              name: "Martin",
              status: "Some text",
              body: "lorem ipsum dolor sit amet",
              sum: "400000,00",
              date: "01.01.2020",
              phone: "8 800 555 35 34"
            },
          ]
        },
        {
          id: 2, cards: [
            {
              id: 1,
              name: "Jackson",
              status: "Some text",
              body: "lorem ipsum dolor sit amet",
              sum: "300000,00",
              date: "01.01.2020",
              phone: "8 800 555 35 35"
            },
            {
              id: 2,
              name: "Martin",
              status: "Some text",
              body: "lorem ipsum dolor sit amet",
              sum: "400000,00",
              date: "01.01.2020",
              phone: "8 800 555 35 34"
            },
            {
              id: 3,
              name: "Mark",
              status: "Some text",
              body: "lorem ipsum dolor sit amet",
              sum: "450000,00",
              date: "01.01.2020",
              phone: "8 800 555 35 34"
            },
          ]
        }
      ]
    }
  },
  methods: {
    toggleTabs: function (tabNumber) {
      this.openTab = tabNumber
    }
  }
  ,
  components: {
    TabContent
  }
}
</script>

<style scoped>
.active {
  color: #007bff;
  border-color: #007bff;
  border-bottom: 2px solid #007bff;
}
</style>