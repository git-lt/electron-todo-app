import { defineStore } from 'pinia'
import type { ParsedEvent, ReconnectInterval } from 'eventsource-parser'
import { createParser } from 'eventsource-parser'
import { useClipboard } from '@vueuse/core'
import { useAppStore } from './app'
import type { ChatInfo, GptMessageClient } from '~/types/openai'
import { GptRole } from '~/types/openai'
import promptsData from '~/assets/json/prompts.json'

export const useChatStore = defineStore('chat', () => {
  const userMessage = ref('')
  const aiSpeaking = ref(false)
  const aiSpeakContent = ref('')
  const prompts = ref<string[][]>(promptsData.cn)
  const searchPromptKeyword = ref<string>('')
  const chatHistory = ref<ChatInfo[]>([])
  const currentRole = ref<string[]>(['AI小助手'])
  const currentChatIndex = ref<number>(-1)
  const currentRoleIndex = ref<number>()
  const withHistoryMessage = ref(true)
  const showEditMessageDialog = ref(false)
  const currentMessage = ref<GptMessageClient>()
  // const needAIAnswer = ref(false)
  const currentChat = ref<ChatInfo>({
    roleName: 'AI小助手',
    messages: [],
    date: new Date(),
  })

  const { copy, isSupported } = useClipboard()

  function onParse(event: ParsedEvent | ReconnectInterval) {
    if (event.type === 'event') {
      if (event.data === '[DONE]') {
        addMessageItem(GptRole.ASSISTANT, aiSpeakContent.value)
        aiSpeakContent.value = ''
        aiSpeaking.value = false
        return
      }
      const data = JSON.parse(event.data)
      const content = data.choices[0].delta.content || ''
      aiSpeakContent.value += content
    }
  }

  const parser = createParser(onParse)

  const roleName = computed(() => {
    return currentChat.value?.roleName
  })
  const showPromptList = computed(() => {
    if (!searchPromptKeyword.value)
      return prompts.value

    return prompts.value.filter(v => v.toString().includes(searchPromptKeyword.value))
  })
  const roleContent = computed(() => {
    return currentRole.value[1] || ''
  })

  function resetCurrentChat(roleName = 'AI小助手') {
    currentChat.value = {
      roleName,
      messages: [],
      date: new Date(),
    }
    currentChatIndex.value = -1
  }

  function createChat(roleName = 'AI小助手') {
    resetCurrentChat(roleName)
    chatHistory.value.unshift(currentChat.value)
    currentChatIndex.value = 0
  }
  function clearChat() {
    currentChat.value.messages = []
  }

  function addHistory(chat: ChatInfo) {
    chatHistory.value.unshift(chat)
  }

  function deleteHistory(index: number, event: Event) {
    console.log('deleteHistory')
    if (currentChatIndex.value === index)
      currentChatIndex.value = -1

    chatHistory.value.splice(index, 1)

    if (chatHistory.value.length) {
      currentChatIndex.value = 0
      currentChat.value = chatHistory.value[0]
    }
    else {
      createChat()
    }
    event.stopPropagation()
  }

  function useHistory(index: number) {
    currentChatIndex.value = index
    currentChat.value = chatHistory.value[index]
  }

  function deleteMessageItem(index: number) {
    currentChat.value?.messages.splice(index, 1)
  }
  function addMessageItem(role: GptRole, content: string) {
    currentChat.value?.messages.push({ role, content, date: new Date() })
  }
  function editMessageItem(index: number) {
    const item = currentChat.value.messages.find((v, i) => i === index)
    if (!item)
      return
    showEditMessageDialog.value = true
    currentMessage.value = item
  }
  function copyMessageItem(index: number, event: MouseEvent) {
    const item = currentChat.value.messages.find((v, i) => i === index)
    if (!item)
      return
    if (!isSupported) {
      console.log('Your browser does not support Clipboard API')
      return
    }
    copy(item.content)
    if (!event.target)
      return
    const { top: y, left: x } = (event.target as HTMLButtonElement).getBoundingClientRect()
    const appStore = useAppStore()
    appStore.showMessage({ x, y })
  }

  // 重新回答
  function reAnswer(index: number) {
    // 删除当前及以下回答
    currentChat.value.messages = currentChat.value.messages.slice(0, index)
    getAIAnswer()
  }

  // 快速回答
  function quickAskQuestion(content: string) {
    if (currentChat.value) {
      addMessageItem(GptRole.USER, content)
    }
    else {
      createChat()
      addMessageItem(GptRole.USER, content)
    }
    getAIAnswer()
  }

  function setCurrentRole(role: string[]) {
    currentRole.value = role
    createChat(role[0])
    addMessageItem(GptRole.SYSTEM, role[1])
    getAIAnswer()
  }

  async function getAIAnswer() {
    console.log('getAIAnswer')
    // 流
    const res = await fetch('/api/ai/chat', {
      body: JSON.stringify(currentChat.value),
      method: 'POST',
    })
    if (!res.body)
      return

    const reader = res.body.pipeThrough(new TextDecoderStream()).getReader()

    aiSpeaking.value = true
    while (aiSpeaking.value) {
      const { value, done } = await reader.read()
      console.log(done)
      if (done) {
        // addMessageItem(GptRole.ASSISTANT, aiSpeakContent.value)
        // aiSpeakContent.value = ''
        // aiSpeaking.value = false
        break
      }
      parser.feed(value)
    }
  }

  function askQuestion() {
    const content = userMessage.value
    if (!content)
      return
    addMessageItem(GptRole.USER, content)
    userMessage.value = ''

    // AI 回答
    getAIAnswer()
  }

  function onKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      // 发送消息
      askQuestion()
      // 阻止默认的换行行为
      event.preventDefault()
    }
  }

  function init() {
    if (chatHistory.value.length > 0 && !chatHistory.value[currentChatIndex.value]) {
      currentChatIndex.value = 0
      useHistory(0)
    }
  }

  return {
    init,

    // history
    chatHistory,
    addHistory,
    deleteHistory,
    useHistory,

    // messages
    withHistoryMessage,
    userMessage,
    addMessage,
    deleteMessageItem,
    addMessageItem,
    editMessageItem,
    copyMessageItem,
    reAnswer,
    quickAskQuestion,

    // role
    currentRoleIndex,
    currentRole,
    roleName,
    roleContent,
    setCurrentRole,

    // chat
    currentChat,
    currentChatIndex,
    createChat,
    clearChat,

    // prompt
    prompts,
    searchPromptKeyword,
    showPromptList,

    aiSpeaking,
    aiSpeakContent,
    askQuestion,
    onKeydown,
  }
}, {
  persist: {
    storage: persistedState.localStorage,
  },
})
