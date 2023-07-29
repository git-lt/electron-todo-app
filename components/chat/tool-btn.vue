<script lang="ts" setup>
interface Props {
  name: string
  icon: string
}
defineProps<Props>()
</script>

<template>
  <button class="chat-tool-btn btn btn-circle btn-sm transition-all origin-left bg-base-content/10 flex flex-nowrap justify-start px-[6px] duration-300">
    <Icon :name="icon" class="text-base font-bold flex-shrink-0 pointer-events-none" />
    <span class="chat-tool-btn-text whitespace-nowrap opacity-0  text-sm transition-all -translate-x-2  duration-300 pointer-events-none ">{{ name }}</span>
  </button>
</template>

<style scoped>
.chat-tool-btn:hover {
  @apply w-[72px] bg-base-content/20
}
.chat-tool-btn:hover .chat-tool-btn-text {
  opacity: 1;
  transform: translateX(0);
}
</style>
