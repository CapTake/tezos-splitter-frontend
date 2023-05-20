<template>
    <span>
        {{ display }}
    </span>
</template>

<script setup>
import tzdomains from '../utils/tezos-domains'
import { computed, ref, onMounted } from 'vue'

// eslint-disable-next-line no-undef
const props = defineProps({ value: String, placeholder: String })

const loading = ref(true)

const domain = ref('')

const display = computed(() => domain.value || props.placeholder)
onMounted(() => {
  if (!props.value) return
  tzdomains.resolveAddressToName(props.value)
    .then(res => { domain.value = res || `${props.value.slice(0, 5)}...${props.value.slice(-5)}` })
    .catch(err => { console.log(err) })
    .finally(() => { loading.value = false })
})

</script>
