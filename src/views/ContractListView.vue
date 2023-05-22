<template>
<section class="max-w-full md:max-w-6xl mx-auto px-4 my-6 overflow-hidden">
  <h1 class="mb-8 mt-4 md:mt-8 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white text-center">Recent splitter contracts</h1>
  <SplitterList :items="splitters" :ready="splitters.length > 0" />
</section>

</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import SplitterList from '@/components/SplitterList.vue'

const store = useStore()

const splitters = ref([])

onMounted(async () => {
  splitters.value = await store.dispatch('listSplitters', {})
})
</script>
