<template>
    <section class="w-full max-w-4xl mx-auto px-4 my-6 overflow-hidden">
      <h1 class="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white text-center">
        Splitter <a :href="explorerLink(addr)" target="_blank" rel="noopener noreferrer">{{ short }}</a>
      </h1>
      <TransitionGroup>
        <div v-if="loading" class="flex w-full justify-center items-center h-[40vh]">
          <svg aria-hidden="true" class="md:w-20 md:h-20 h-10 w-10 text-gray-200 animate-spin dark:text-gray-600 fill-gray-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          </svg>
        </div>
        <div v-if="loaded" class="flex flex-col md:flex-row justify-center md:justify-between md:items-start items-center gap-4">
          <div class="w-full p-4 py-6 md:w-1/2 mx-auto">
              <Pie id="pie-chart-id" :options="chartOptions" :data="chartData" />
          </div>
          <div class="w-full p-4 py-6 md:w-1/3 mx-auto">
            <div class="flex gap-4 justify-between items-center pb-2 text-gray-400 dark:text-gray-600 text-sm">
              <div>Address</div>
              <div>Share</div>
            </div>
            <div v-for="item in shares" :key="item.address" class="flex justify-between mb-4">
              <a :href="explorerLink(item.address)" target="_blank" rel="noopener noreferrer" class="grow">
                <AddressDisplay :value="item.address" :placeholder="item.label" />
              </a>
              <div class>
                {{ item.share }}
              </div>
            </div>
          </div>
        </div>
        <div v-if="balances.length > 0" class="my-8 md:my-10">
          <h2 class="mb-4 text-2xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-3xl dark:text-white text-center">Token balances</h2>
          <div v-for="b in balances" :key="b.token?.symbol + b.token?.address" class="flex flex-col md:flex-row md:gap-4 justify-between items-center mb-4 md:mb-6 hover:text-black dark:hover:text-white">
            <div class="text-elipsis overflow-hidden grow">
              <a v-if="b.token.address" :href="explorerLink(b.token.address)" target="_blank" rel="noopener noreferrer">
                {{ b.token.name || shortAddress(b.token.address, b.token.decimals) }}
              </a>
              <span v-else>
                {{ b.token.name || shortAddress(b.token.address, b.token.decimals) }}
              </span>
            </div>
            <div class="flex justify-between md:justify-end items-center gap-4 md:gap-6 wrap w-full md:w-auto text-sm md:text-base">
              <div class="overflow-hidden text-ellipsis">
                {{ displayBalance(b.balance, b.token.decimals) }}&nbsp;{{ b.token.symbol }}
              </div>
              <button @click="$event => distribute(b.token, b.balance)" v-if="b.balance.isGreaterThan(0)"
                :class="`${working ? 'opacity-60 cursor-not-allowed' : ''} flex items-center gap-1 px-3 py-2 text-xs md:text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`">
                <svg v-if="working" aria-hidden="true" class="md:w-3 md:h-3 -ml-1 h-2.5 w-2.5 text-gray-200 animate-spin dark:text-gray-600 fill-gray-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                Distribute
              </button>
            </div>
          </div>
        </div>
      </TransitionGroup>
    </section>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { watchImmediate } from '@vueuse/core'
import { validateAddress } from '@taquito/utils'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { Pie } from 'vue-chartjs'
import { displayBalance, shortAddress } from '../utils/misc'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from 'chart.js'
import AddressDisplay from '@/components/AddressDisplay.vue'

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale)

// eslint-disable-next-line
const props = defineProps({ addr: String })

const store = useStore()

const router = useRouter()

const toast = useToast()

const short = computed(() => `${props.addr.slice(0, 7)}...${props.addr.slice(-7)}`)

const shares = ref([])

const explorerLink = (address) => `${process.env.VUE_APP_EXPLORER_URL}/${address}`

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

const working = ref(false)

const loaded = ref(false)

const balances = ref([])

const polling = ref(true)

const poll = async () => {
  balances.value = await store.dispatch('getTokenBalances', props.addr)
  if (polling.value) setTimeout(poll, 5 * 1000)
}

const load = async () => {
  try {
    loading.value = true
    shares.value = await store.dispatch('getSplitterShares', props.addr)
    loaded.value = true
  } catch (e) {
    console.log(e)
  } finally {
    loading.value = false
  }
}
const distribute = async (token, amount) => {
  if (working.value) return
  try {
    working.value = true

    await store.dispatch('distribute', { splitter: props.addr, token, amount })
    toast.success(`Successfully distributed ${displayBalance(amount, token.decimals)} ${token.symbol || 'Tokens'}`)
  } catch (e) {
    console.log(e)

    toast.error(e.message)
  } finally {
    working.value = false
  }
}

watchImmediate(props.addr, async function () {
  if (!props.addr.startsWith('KT') || validateAddress(props.addr) !== 3) {
    toast.error('Invalid Splitter Address')
    router.replace('/')
  }
  await load()
})

onMounted(async () => {
  polling.value = true
  await poll()
})

onBeforeUnmount(() => { polling.value = false })
</script>
