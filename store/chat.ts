import { defineStore } from 'pinia'
import type { GptMessageClient, GptRole } from '~/types/openai'

export const useChatStore = defineStore('chat', () => {
  const messages = ref<GptMessageClient[]>([])
  function addMessage(role: GptRole, content: string) {
    messages.value.push({ role, content, date: new Date() })
  }
  return {
    messages,
    addMessage,
  }
})
