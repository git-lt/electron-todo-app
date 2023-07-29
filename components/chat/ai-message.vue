<script lang="ts" setup>
import DateInfo from './date-info.vue'
import type { GptMessageClient } from '~/types/openai'
interface Props {
  data: GptMessageClient
  index: number
}
defineProps<Props>()
</script>

<template>
  <div class="group flex justify-start p-4 mr-20  relative  pt-12">
    <div class="absolute top-0 w-full flex justify-start h-12 items-center pl-16">
      <DateInfo :date="data.date" class="mr-4" />
      <ChatMsgTool class="opacity-0 group-hover:opacity-100 transition-opacity" :index="index" :role="data.role" />
    </div>
    <div class="flex items-start  w-full">
      <div class="avatar placeholder mr-4">
        <div class="text-green-400 rounded-full w-12 text-3xl">
          <Icon name="simple-icons:openai" />
        </div>
      </div>
      <div class="rounded-lg bg-slate-100 text-slate-800 px-4 py-2 text-md">
        <BaseMarkdownContent :value="data.content" />
      </div>
    </div>
  </div>
</template>
