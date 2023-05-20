<template>
    <button @click="toggleSync()">
      <AddressDisplay :value="address" placeholder="Connect wallet" :key="address" />
    </button>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import AddressDisplay from './AddressDisplay.vue'

const store = useStore()

const address = computed(() => store.state.userAddress)

const toggleSync = () => store.dispatch(store.getters.connected ? 'disconnectWallet' : 'connectWallet')
</script>
