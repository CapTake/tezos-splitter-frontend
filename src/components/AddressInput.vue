<template>
<div class="relative">
  <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
    <svg v-if="loading" aria-hidden="true" class="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-gray-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <svg v-else-if="errorMessage" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="red" class="w-5 h-5"><path fill-rule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" /></svg>
  </div>
  <input @focus="onFocus()" @blur="onBlur()" @input="onInput" type="text" :class="classes" placeholder="address or tezos domain">
</div>
<p v-if="errorMessage" class="mt-2 text-sm text-red-600 dark:text-red-500">{{ errorMessage }}</p>
</template>

<script setup>
import { computed, ref } from 'vue'
import { isValidAddress } from '../utils/tezos'
import tzdomains from '../utils/tezos-domains'

// eslint-disable-next-line no-undef
const props = defineProps({ error: String, modelValue: String })
// eslint-disable-next-line no-undef
defineEmits(['update:modelValue'])

const validationError = ref('')

const address = ref('')

const loading = ref(false)

const errorMessage = computed(() => validationError.value || props.error)

const onFocus = () => { validationError.value = '' }

const onBlur = async () => {
  try {
    loading.value = true

    const isValidAddr = isValidAddress(address.value) && !address.value.startsWith('tz4')

    if (!isValidAddr) {
      const res = await tzdomains.resolveNameToAddress(address.value)
      if (!res) {
        throw new Error('Invalid address or Tezos domain')
      }
      address.value = res
    }
  } catch (e) {
    validationError.value = 'Invalid address'

    console.log(e)
  } finally {
    loading.value = false
  }
}

const onInput = async (event) => {
  address.value = (event.target.value || '').trim()
}

const classes = computed(() => errorMessage.value
  ? 'pl-10 bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400'
  : 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
)
</script>
