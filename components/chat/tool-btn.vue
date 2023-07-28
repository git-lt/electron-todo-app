<script lang="ts" setup>
interface Props {
  name: string
  icon: string
}
defineProps<Props>()

const emits = defineEmits<{
  (e: 'click'): void
}>()
</script>

<template>
  <button class="group/actions btn btn-circle btn-sm hover:w-[72px] transition-all origin-left bg-base-content/10 flex flex-nowrap justify-start px-[6px] hover:bg-base-content/20 duration-300" @click="emits('click')">
    <Icon :name="icon" class="text-base font-bold flex-shrink-0" />
    <span class="whitespace-nowrap opacity-0 group-hover/actions:opacity-100 text-sm transition-all -translate-x-2 group-hover/actions:translate-x-0 duration-300">{{ name }}</span>
  </button>
</template>
