<template>
<Transition mode="out-in">
    <div v-if="connected">
        <h2 v-show="splitters.length > 0" class="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white text-center">Your splitters</h2>
        <div v-show="splitters.length > 0" class="flex gap-4 justify-between items-center pt-4 pb-2 text-gray-400 dark:text-gray-600 px-5 text-sm">
            <div>
                Address
            </div>
            <div>
                Created
            </div>
        </div>
        <router-link v-for="item in splitters" :to="{name: 'splitter', params: { addr: item.splitter }}" :key="item.splitter" class="flex gap-4 justify-between items-center border border-gray-200 dark:border-gray-800 p-4 rounded-lg mb-2 cursor-pointer hover:border-black dark:hover:border-white">
            <div class="hidden sm:inline-block">
                {{ item.splitter }}
            </div>
            <div class="sm:hidden inline-block">
                {{ item.label }}
            </div>
            <UseTimeAgo v-slot="{ timeAgo }" :time="item.createdAt">
                <span class="text-sm text-gray-400 dark:text-gray-600">
                    {{ timeAgo }}
                </span>
            </UseTimeAgo>
        </router-link>
    </div>
</Transition>
</template>

<script setup>
import { useStore } from 'vuex'
import { computed } from 'vue'
import { UseTimeAgo } from '@vueuse/components'

const store = useStore()

const splitters = computed(() => store.state.splitters.map(({ splitter, createdAt }) => ({ splitter, label: `${splitter.slice(0, 9)}...${splitter.slice(-10)}`, createdAt })))

const connected = computed(() => store.getters.connected)

</script>
