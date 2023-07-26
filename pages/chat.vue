<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import type { ParsedEvent, ReconnectInterval } from 'eventsource-parser'
import { createParser } from 'eventsource-parser'

import { useChatStore } from '~/store/chat'
import { GptRole } from '~/types/openai'

definePageMeta({
  auth: false,
  layout: 'default',
})
const chatStore = useChatStore()
const msg = ref('')
const aiSpeaking = ref(false)
const aiSpeakContent = ref('')

const scrollViewRef = ref()
const { y } = useScroll(scrollViewRef)

const scrollToBottom = () => {
  nextTick(() => {
    y.value = scrollViewRef.value?.scrollHeight || 0
  })
}

watch(aiSpeakContent, (val) => {
  if (val)
    scrollToBottom()
})

const { messages } = storeToRefs(chatStore)

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

async function askQuestion() {
  if (!msg)
    return
  const content = msg.value

  chatStore.addMessage(GptRole.USER, content)
  msg.value = ''

  // 流
  const res = await fetch('/api/ai/chat', {
    body: JSON.stringify({ message: content, user: GptRole.USER }),
    method: 'POST',
  })
  if (!res.body)
    return

  const reader = res.body.pipeThrough(new TextDecoderStream()).getReader()

  aiSpeaking.value = true
  while (true) {
    const { value, done } = await reader.read()
    if (done) {
      aiSpeaking.value = false
      chatStore.addMessage(GptRole.ASSISTANT, aiSpeakContent.value)
      aiSpeakContent.value = ''
      break
    }
    parser.feed(value)
  }

  // 非流
  // const response = await $fetch<{ message: string }>('/api/ai/chat', {
  //   body: { message: content, user: GptRole.USER },
  //   method: 'POST',
  // })
  // chatStore.addMessage(GptRole.ASSISTANT, response.message)
}
</script>

<template>
  <div class="h-full flex justify-center items-center">
    <div class="w-[70%] min-w-[640px] max-w-[1024px] h-4/5 rounded-xl bg-base-content/10 border border-base-content/10 shadow-xl">
      <div class="flex flex-col h-full">
        <!-- scroll container -->
        <div ref="scrollViewRef" class="flex-1 chat-scroll-view">
          <template v-for="(item) in messages" :key="item.date.toString()">
            <div v-if="item.role === GptRole.USER" class="flex justify-end p-4 items-start ml-20">
              <div class="rounded-lg bg-slate-600 text-white px-4 py-2 text-sm animate-fadeIn">
                <BaseMarkdownContent :value="item.content" />
              </div>
            </div>
            <div v-else class="flex justify-start p-4 mr-20  ">
              <div class="flex items-start  w-full">
                <div class="avatar placeholder mr-4">
                  <div class="text-green-400 rounded-full w-12 text-3xl">
                    <Icon name="simple-icons:openai" />
                  </div>
                </div>
                <div class="rounded-lg bg-slate-100 text-slate-800 px-4 py-2 text-sm">
                  <BaseMarkdownContent :value="item.content" />
                </div>
              </div>
            </div>
          </template>
          <!-- AI 当前内容 -->
          <div v-if="aiSpeaking" class="flex justify-start p-4 mr-20 text-sm ">
            <div class="flex items-start  w-full">
              <div class="avatar placeholder mr-4">
                <div class="text-green-400 rounded-full w-12 text-3xl">
                  <Icon name="simple-icons:openai" />
                </div>
              </div>
              <div class="rounded-lg bg-slate-100 text-slate-800 px-4 py-2 text-sm animate-fadeIn">
                <BaseMarkdownContent :value="aiSpeakContent" />
              </div>
            </div>
          </div>
        </div>
        <div class="p-4">
          <div class="flex relative">
            <Icon name="mi:message-alt" class="absolute text-3xl top-5 left-4" />
            <textarea
              v-model.trim="msg"
              class="textarea rounded-full flex-1 textarea-bordered bg-base-content/10 pl-14"
              placeholder="有问题尽管问我" @keydown.enter="askQuestion"
            />
            <div class="flex justify-center items-center px-4">
              <button class="btn btn-primary w-16 h-16 rounded-full" @click="askQuestion">
                <Icon name="prime:send" class="text-2xl" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.chat-scroll-view {
  /* max-height: 90vh; */
  overflow-y: scroll;
}
.hljs {
  background-color: inherit;
}
::-webkit-scrollbar {
    --bar-width: 5px;
    width: var(--bar-width);
    height: var(--bar-width)
}

::-webkit-scrollbar-track {
    background-color: transparent
}

::-webkit-scrollbar-thumb {
    --bar-color: hsla(0,0%,100%,.1);
    background-color: var(--bar-color);
    border-radius: 20px;
    background-clip: content-box;
    border: 1px solid transparent
}
</style>
