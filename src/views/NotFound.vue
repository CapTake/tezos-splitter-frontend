<template>
  <section class="max-w-full md:max-w-6xl mx-auto flex flex-col justify-center items-center text-gray-300 dark:text-gray-700">
    <div class="text-5xl md:text-7xl">404</div>
    <p class="text-base md:text-2xl">Not Found</p>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const splitters = ref([])

onMounted(async () => {
  splitters.value = await store.dispatch('listSplitters', {})
})
</script>
