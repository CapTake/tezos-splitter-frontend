<template>
    <section class="max-w-full md:max-w-6xl mx-auto px-4 my-6 overflow-hidden">
        <h1 class="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white text-center">Splitter {{ short }}</h1>
        <div class="max-w-full p-5 w-[500px] mx-auto">
            <Pie v-if="loaded" id="pie-chart-id" :options="chartOptions" :data="chartData" />
        </div>
        {{ shares }}
        {{ balances }}
        {{ chartData }}
    </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { watchImmediate } from '@vueuse/core'
import { useStore } from 'vuex'
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale)

// eslint-disable-next-line
const props = defineProps({ addr: String })

const store = useStore()

const short = computed(() => `${props.addr.slice(0, 7)}...${props.addr.slice(-7)}`)

const shares = ref([])

const chartData = computed(() => ({
  labels: shares.value.map(({ label }) => label),
  datasets: [{
    data: shares.value.map(({ share }) => share),
    backgroundColor: [
      'rgb(249, 65, 68)',
      'rgb(58, 134, 255)',
      'rgb(243, 114, 44)',
      'rgb(67, 170, 139)',
      'rgb(248, 150, 30)',
      'rgb(144, 190, 109)',
      'rgb(249, 199, 79)',
      'rgb(87, 117, 144)',
      'rgb(255, 190, 11)',
      'rgb(131, 56, 236)',
      'rgb(251, 86, 7)',
      'rgb(255, 0, 110)'
    ]
  }]
}))

const chartOptions = { responsive: true, padding: 10 }

const loading = ref(false)

const loaded = ref(false)

const balances = ref([])

const load = async () => {
  try {
    loading.value = true
    shares.value = await store.dispatch('getSplitterShares', props.addr)
    balances.value = await store.dispatch('getTokenBalances', props.addr)
    loaded.value = true
  } catch (e) {
    console.log(e)
  } finally {
    loading.value = false
  }
}

watchImmediate(props.addr, async () => {
  await load()
})

</script>
