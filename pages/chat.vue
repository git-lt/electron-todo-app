<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import type { ParsedEvent, ReconnectInterval } from 'eventsource-parser'
import { createParser } from 'eventsource-parser'
import dayjs from 'dayjs'

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

function formatDate(date: Date) {
  return dayjs(date).format('YYYY.MM.DD HH:mm:ss')
}

const scrollViewRef = ref()
const { y } = useScroll(scrollViewRef)

const scrollToBottom = () => {
  nextTick(() => {
    y.value = scrollViewRef.value?.scrollHeight || 0
  })
}

const { messages } = storeToRefs(chatStore)

watch([aiSpeakContent, messages], (val) => {
  if (val)
    scrollToBottom()
})

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
  const content = msg.value
  if (!content)
    return
  // console.log(content)
  // return
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
  <div class="h-full flex">
    <div class="w-80 border-r h-full border-base-content/20">
      <div class="p-4 border-b border-base-content/20">
        <button class="btn w-full btn-neutral">
          <Icon name="ic:round-plus" class="text-lg font-bold" /> 新的会话
        </button>
      </div>
      <div class="flex gap-1">
        <button class="group btn btn-circle btn-sm hover:w-[72px] transition-all origin-left bg-base-content/10 flex flex-nowrap justify-start px-[6px] hover:bg-base-content/20 duration-300">
          <Icon name="ic:round-close" class="text-base font-bold flex-shrink-0" />
          <span class="whitespace-nowrap opacity-0 group-hover:opacity-100 text-sm transition-all -translate-x-2 group-hover:translate-x-0 duration-300">删除</span>
        </button>
        <button class="group btn btn-circle btn-sm hover:w-[72px] transition-all origin-left bg-base-content/10 flex flex-nowrap justify-start px-[6px] hover:bg-base-content/20 duration-300">
          <Icon name="ic:round-close" class="text-base font-bold flex-shrink-0" />
          <span class="whitespace-nowrap opacity-0 group-hover:opacity-100 text-sm transition-all -translate-x-2 group-hover:translate-x-0 duration-300">删除</span>
        </button>
      </div>
      <div class="p-4 flex flex-col gap-4">
        <div class="group card card-compact bg-base-content/10 shadow-sm rounded-md hover:bg-base-content/30 transition-colors duration-300 hover:cursor-pointer">
          <div class="card-body relative overflow-hidden">
            <button class="btn btn-square btn-sm absolute top-2 right-2 opacity-0 translate-x-8 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
              <Icon name="ic:round-close" class="text-lg font-bold" />
            </button>
            <h2 class="card-title">
              心理医生
            </h2>
            <!-- <p>If a dog chews shoes whose shoes does he choose?</p> -->
            <div class="flex justify-between text-base-content/50">
              <div>0条对话</div>
              <div>2022.8.9 22:12:09</div>
            </div>
          </div>
        </div>
        <div class="card card-compact bg-base-content/10 shadow-sm  rounded-md">
          <div class="card-body">
            <h2 class="card-title">
              心理医生
            </h2>
            <div class="flex justify-between  text-base-content/50">
              <div>0条对话</div>
              <div>2022.8.9 22:12:09</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="h-full flex justify-center items-center flex-1 py-8">
      <div class="w-[90%] min-w-[640px] max-w-[1200px] h-full bg-base-content/10 rounded-2xl overflow-hidden">
        <div class="flex flex-col h-full">
          <div class="h-20 bg-base-content/10 p-4">
            <div>生活助手</div>
            <div />
          </div>
          <!-- scroll container -->
          <div ref="scrollViewRef" class="flex-1 chat-scroll-view p-4">
            <template v-for="(item) in messages" :key="item.date.toString()">
              <div v-if="item.role === GptRole.USER" class="flex justify-end p-4 items-start ml-20 relative pt-8">
                <div class="absolute top-0 text-sm text-base-content/50">
                  {{ formatDate(item.date) }}
                </div>
                <div class="rounded-lg bg-slate-600 text-white px-4 py-2 text-sm animate-fadeIn">
                  <BaseMarkdownContent :value="item.content" />
                </div>
                <div class="avatar placeholder mr-4">
                  <div class="rounded-full w-12 text-4xl">
                    <Icon name="noto:chipmunk" />
                  </div>
                </div>
              </div>
              <div v-else class="flex justify-start p-4 mr-20  relative  pt-8">
                <div class="absolute top-0 text-sm text-base-content/50">
                  {{ formatDate(item.date) }}
                </div>
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
            <div class="flex">
              <Icon name="mi:message-alt" class="text-3xl" />
              <div class="flex flex-1 relative">
                <div class="min-h-[64px] invisible break-words whitespace-pre-wrap">
                  {{ msg }}
                </div>
                <textarea
                  v-model.trim="msg"
                  row="1"
                  resize="false"
                  class="absolute left-20 top-0 right-0 h-full textarea textarea-xs flex-1 textarea-bordered bg-base-content/10 pl-4 placeholder:leading-[56px] overflow-hidden"
                  placeholder="有问题尽管问我"
                />
              </div>
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
