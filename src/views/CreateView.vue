<template>
    <section class="max-w-full md:max-w-6xl mx-auto px-4 my-6 overflow-hidden relative">
        <h1 class="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white text-center">Create Splitter</h1>
        <div class="max-w-full py-5 w-[500px] mx-auto">
            <div v-if="error" class="flex p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-red-900 dark:text-red-400" role="alert">
                <svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                <span class="sr-only">Info</span>
                <div>
                    <span class="font-medium">Error!</span> {{ error }}
                </div>
            </div>
            <div v-else-if="warning" class="flex p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-yellow-600 dark:text-yellow-900" role="alert">
                <svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                <span class="sr-only">Info</span>
                <div>
                    <span class="font-medium">Warning!</span> {{ warning }}
                </div>
            </div>
            <div class="flex gap-4 justify-between items-center pt-4 -pb-4 text-gray-400 dark:text-gray-600 px-5 text-sm">
              <div>Address</div>
              <div>Share</div>
            </div>
            <div v-for="(item, index) in holders" :key="item.address + index" class="my-4">
                <div class="flex gap-3">
                    <div class="relative grow">
                        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg v-if="item.loading" aria-hidden="true" class="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-gray-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                            </svg>
                            <svg v-else-if="item.error" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="red" class="w-5 h-5"><path fill-rule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" /></svg>
                        </div>
                        <input v-model.trim="item.address" @focus="$event => onInputFocus($event)" @blur="$event => validateItem(item)" type="text" spellcheck="false" class="text-ellipsis bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="address or tezos domain">
                    </div>
                    <div class="shrink">
                        <input v-model="item.share" @focus="$event => onInputFocus($event)" @input="$event => fixItemShare(item)" type="number" min="1" max="10000" step="1" class="bg-gray-50 w-24 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block pl-4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    </div>
                    <button v-if="holders.length > 2" @click="$event => deleteHolder(index)" class="transition-all opacity-50 hover:opacity-100">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <p v-if="item.error" class="text-sm text-red-400 dark:text-red-600 pt-2">{{ item.error }}</p>
            </div>
            <button @click="$event => addHolder('')" class="transition-all opacity-50 hover:opacity-100 p-2 -mt-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </button>
            <div class="flex justify-between items-start mt-6">
                <button @click="onCreate" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Deploy splitter contract</button>
            </div>
        </div>
        <div v-if="working" class="absolute inset-0 flex justify-center items-center bg-black bg-opacity-80 rounded-lg">
          <svg aria-hidden="true" class="w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-gray-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          </svg>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { validateAddress } from '@taquito/utils'
import tzdomains from '../utils/tezos-domains'
import { MichelsonMap } from '@taquito/taquito'

const holders = ref([])

const working = ref(false)

const store = useStore()

const router = useRouter()

const error = computed(() => {
  if (hasDuplicateAddresses.value) return 'Duplicate addresses found.'
  if (holders.value.length < 2) return 'At least 2 shareholders required.'
  return ''
})

const warning = computed(() => holders.value.length >= 10 ? 'Big number of shareholders can require a bigger gas consumption, please be warned!' : '')

const addHolder = (address, share = 1) => {
  holders.value.push({ address, share, error: '', loading: false })
}

const deleteHolder = index => holders.value.splice(index, 1)

const hasDuplicateAddresses = computed(() => (new Set(holders.value.map(({ address }) => address))).size !== holders.value.length)

const realHolders = computed(() => holders.value.filter(({ address }) => !!address))

const hasErrors = computed(() => error.value || holders.value.some(({ error, loading }) => (error || loading)))

const onInputFocus = event => { event.target.select() }

const fixItemShare = item => {
  if (item.share < 1) item.share = 1
  if (item.share > 10000) item.share = 10000
}

const onCreate = async () => {
  try {
    if (hasErrors.value || realHolders.value.length !== holders.value.length) return

    working.value = true

    const obj = Object.fromEntries(realHolders.value.map(({ address, share }) => [address, share]))

    await store.dispatch('createSplitter', MichelsonMap.fromLiteral(obj))

    router.push('/')
  } catch (e) {
    console.log(e)
  } finally {
    working.value = false
  }
}

const resolveAddress = async (item) => {
  try {
    item.loading = true

    const res = await tzdomains.resolveNameToAddress(item.address)

    if (!res) {
      throw new Error('Invalid Tezos domain')
    }

    item.address = res
  } catch (e) {
    item.error = 'Can\'t resolve tezos domain'

    console.log(e)
  } finally {
    item.loading = false
  }
}

const validateItem = useDebounceFn(item => {
  try {
    item.error = ''

    if (!item.address) return

    if (item.address?.includes('.')) return resolveAddress(item)

    if (validateAddress(item.address) !== 3) throw new Error('Invalid address')

    if (item.address.startsWith('tz4')) throw new Error('Unsupported address type')
  } catch (e) {
    item.error = e.message
    console.log(e)
  }
}, 1000)

onMounted(() => {
  addHolder(store.state.userAddress, 1)
  addHolder('')
})
</script>
