<template>
  <div class="grid grid-flow-row-dense grid-cols-3 gap-4">
    <div class="col-span-2 border-2 shadow rounded-lg p-3 text-center">
      <Bar :chart-data="chartData" :height="200"/>
    </div>
    <div class="border-2 shadow rounded-lg p-3 text-center">
      <Doughnut :chart-data="chartData" :height="200"/>
    </div>
  </div>
</template>
<script>
import {Bar, Doughnut} from 'vue-chartjs'
import {BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip, ArcElement} from 'chart.js'

import randomColor from 'randomcolor';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement)

export default {
  name: 'BarChart',
  components: {Bar, Doughnut},
  data() {
    return {
      chartData: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: [randomColor(), randomColor(), randomColor(), randomColor(), randomColor(), randomColor(), randomColor()],
            data: [40, 20, 12, 39, 10, 40, 38]
          }
        ]
      },
      donutData: {
        labels: ['test 1', 'Test 2', 'Test 3'],
        datasets: [
          {
            backgroundColor: [randomColor(), randomColor(), randomColor()],
            data: [1, 34, 12]
          }
        ]
      }
    }
  }
}
</script>
<style scoped>

</style>