<script lang="ts" setup>
import DateInfo from './date-info.vue'
interface Props {
  content: string
  date: Date
}
defineProps<Props>()
</script>

<template>
  <div class="group flex justify-end p-4 items-start ml-20 relative pt-12">
    <div class="absolute top-0 w-full flex justify-end h-12 items-center pr-16">
      <ChatMsgTool class="opacity-0 group-hover:opacity-100 transition-opacity" />
      <DateInfo :date="date" class="ml-4" />
    </div>
    <div class="rounded-lg bg-slate-600 text-white px-4 py-2 text-sm animate-fadeIn">
      <BaseMarkdownContent :value="content" />
    </div>
    <div class="avatar placeholder ml-4">
      <div class="rounded-full w-12 text-4xl">
        <Icon name="noto:chipmunk" />
      </div>
    </div>
  </div>
</template>
