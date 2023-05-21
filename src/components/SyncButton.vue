<template>
    <div class="relative">
      <button @click="onClick()" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
        <AddressDisplay :value="address" placeholder="Connect wallet" :key="address" />
      </button>
      <div v-if="open" ref="dropdown" class="z-10 absolute mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-800">
        <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
          <li>
            <button @click="onDisconnect()" class="block px-6 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Disconnect</button>
          </li>
        </ul>
      </div>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { onClickOutside } from '@vueuse/core'
import AddressDisplay from './AddressDisplay.vue'

const store = useStore()

const open = ref(false)

const dropdown = ref(null)

onClickOutside(dropdown, () => {
  setTimeout(() => { open.value = false }, 50)
})

const address = computed(() => store.state.userAddress)

const onClick = () => {
  if (store.getters.connected) {
    open.value = !open.value
  } else {
    store.dispatch('connectWallet')
  }
}

const onDisconnect = () => {
  open.value = false
  store.dispatch('disconnectWallet')
}

// const toggleSync = () => store.dispatch(store.getters.connected ? 'disconnectWallet' : 'connectWallet')
</script>
