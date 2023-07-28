import { defineStore } from 'pinia'
import type { ParsedEvent, ReconnectInterval } from 'eventsource-parser'
import { createParser } from 'eventsource-parser'
import { useClipboard } from '@vueuse/core'
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
  const currentRoleIndex = ref<number>()
  const withHistoryMessage = ref(true)
  const scrollViewRef = ref()
  const showEditMessageDialog = ref(false)
  const currentMessage = ref<GptMessageClient>()
  const currentChat = ref<ChatInfo>({
    messages: [],
  })

  const { copy, copied, isSupported } = useClipboard()
  const { y } = useScroll(scrollViewRef)

  const scrollToBottom = () => {
    nextTick(() => {
      y.value = scrollViewRef.value?.scrollHeight || 0
    })
  }

  function onParse(event: ParsedEvent | ReconnectInterval) {
    if (event.type === 'event') {
      if (event.data === '[DONE]') {
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
    return currentRole.value[0]
  })
  const showPromptList = computed(() => {
    if (!searchPromptKeyword.value)
      return prompts.value

    return prompts.value.filter(v => v.toString().includes(searchPromptKeyword.value))
  })
  const roleContent = computed(() => {
    return currentRole.value[1]
  })

  function createChat(chat: ChatInfo) {
    currentChat.value = chat
    chatHistory.value.unshift(currentChat.value)
  }
  function clearChat() {
    currentChat.value.messages = []
  }

  function addHistory(chat: ChatInfo) {
    chatHistory.value.unshift(chat)
  }

  function deleteHistory(index: number) {
    chatHistory.value.splice(index, 1)
  }

  function useHistory(index: number) {
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
  function copyMessageItem(index: number) {
    const item = currentChat.value.messages.find((v, i) => i === index)
    if (!item)
      return
    if (!isSupported) {
      console.log('Your browser does not support Clipboard API')
      return
    }
    copy(item.content)
  }

  function setCurrentRole(role: string[]) {
    currentRole.value = role
    addMessageItem(GptRole.SYSTEM, role[1])
  }

  async function askQuestion() {
    const content = userMessage.value
    if (!content)
      return
    // console.log(content)
    // return
    addMessageItem(GptRole.USER, content)
    userMessage.value = ''

    // 流
    const res = await fetch('/api/ai/chat', {
      body: JSON.stringify(currentChat),
      method: 'POST',
    })
    if (!res.body)
      return

    const reader = res.body.pipeThrough(new TextDecoderStream()).getReader()

    aiSpeaking.value = true
    while (aiSpeaking.value) {
      const { value, done } = await reader.read()
      if (done) {
        aiSpeaking.value = false
        addMessageItem(GptRole.ASSISTANT, aiSpeakContent.value)
        aiSpeakContent.value = ''
        break
      }
      parser.feed(value)
    }
  }

  function onKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      // 发送消息
      askQuestion()
      // 阻止默认的换行行为
      event.preventDefault()
    }
  }

  watch([aiSpeakContent, currentChat], (val) => {
    if (val)
      scrollToBottom()
  })

  return {
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

    // role
    currentRoleIndex,
    currentRole,
    roleName,
    roleContent,
    setCurrentRole,

    // chat
    currentChat,
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
    scrollToBottom,
  }
})
