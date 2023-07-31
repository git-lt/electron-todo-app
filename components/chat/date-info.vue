<script lang="ts" setup>
import { computed } from 'vue'
import dayjs from 'dayjs'

interface Props {
  date: Date | string
}
const props = defineProps<Props>()

const dateStr = computed(() => {
  return dayjs(props.date).format('YYYY.MM.DD HH:mm:ss')
})
</script>

<template>
  <div class="text-sm text-base-content/50">
    {{ dateStr }}
  </div>
</template>
