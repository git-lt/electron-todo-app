<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useChatStore } from '~/store/chat'
const chatStore = useChatStore()
const { chatHistory, currentChatIndex } = storeToRefs(chatStore)
const { deleteHistory, useHistory } = chatStore
</script>

<template>
  <div class="p-4 flex flex-col gap-4 flex-1 overflow-y-scroll">
    <div v-for="(item, index) in chatHistory" :key="index" class="group card card-compact bg-base-content/10 shadow-sm rounded-md hover:bg-base-content/30 transition-colors duration-300 hover:cursor-pointer border-2 border-transparent" :class="currentChatIndex === index ? ['!border-primary'] : []" @click="useHistory(index)">
      <div class="card-body relative overflow-hidden">
        <button class="btn btn-square btn-sm absolute top-2 right-2 opacity-0 translate-x-8 group-hover:opacity-100 group-hover:translate-x-0 transition-all" @click="$event => deleteHistory(index, $event)">
          <Icon name="ic:round-close" class="text-lg font-bold" />
        </button>
        <h2 class="card-title">
          {{ item.roleName }}
        </h2>
        <div class="flex justify-between text-base-content/50">
          <div>{{ item.messages.length }}条对话</div>
          <div>
            {{ formatDateTime(item.date) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
