<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useChatStore } from '~/store/chat'
import { useAppStore } from '~/store/app'
import { GptRole } from '~/types/openai'

definePageMeta({
  auth: false,
  layout: 'default',
})
const scrollViewRef = ref<HTMLDivElement>()
const chatStore = useChatStore()
const appStore = useAppStore()
const { isDark } = storeToRefs(appStore)

const { currentChat, aiSpeakContent, aiSpeaking, userMessage, roleName, showPromptList, searchPromptKeyword, withHistoryMessage, models } = storeToRefs(chatStore)
const { onKeydown, askQuestion, setCurrentRole, clearChat, init, createChat, toggleWithHistory, setModel } = chatStore
const { toggleDark } = appStore

const { y } = useScroll(scrollViewRef)

const scrollToBottom = () => {
  nextTick(() => {
    y.value = scrollViewRef.value?.scrollHeight || 0
  })
}

watch([aiSpeakContent, currentChat, userMessage], (val) => {
  if (val)
    scrollToBottom()
})

onMounted(() => {
  init()
  scrollToBottom()
})
</script>

<template>
  <div class="h-full flex relative">
    <div class="bg-primary pointer-events-none absolute -left-10 -top-10 aspect-square w-2/5 rounded-full opacity-5 blur-3xl" />
    <div class="bg-success pointer-events-none absolute aspect-square w-2/5 rounded-full opacity-5 blur-3xl -bottom-10 -right-10" />
    <div class="w-80 border-r h-full border-base-content/20 flex flex-col">
      <div class="p-4 border-b border-base-content/20">
        <button class="btn w-full bg-base-content/10" @click="() => createChat()">
          <Icon name="ic:round-plus" class="text-lg font-bold" /> 新的会话
        </button>
      </div>
      <ChatHistoryList />
      <div class="flex justify-end h-10 items-center px-4">
        <button tabindex="0" class="btn btn-circle btn-sm btn-outline" data-toggle-theme="dark,light" data-act-class="ACTIVECLASS" @click="() => toggleDark()">
          <Icon v-if="isDark" name="ic:twotone-nightlight" class="text-base font-bold flex-shrink-0  text-primary" />
          <Icon v-else name="ic:twotone-light-mode" class="text-base font-bold flex-shrink-0" />
        </button>
      </div>
    </div>
    <div class="h-full flex justify-center items-center flex-1 py-8">
      <div class="w-[90%] min-w-[640px] max-w-[1200px] h-full bg-base-content/5 rounded-2xl overflow-hidden">
        <div class="flex flex-col h-full">
          <div class="h-20 bg-slate-200 dark:bg-slate-700 py-4 px-8 flex items-center justify-between">
            <div class="flex items-center">
              <div class="[&::selection]:text-base-content relative col-start-1 row-start-1 leading-tight motion-reduce:!opacity-100 [&::selection]:bg-blue-700/20 bg-[linear-gradient(90deg,hsl(var(--s))_0%,hsl(var(--sf))_9%,hsl(var(--pf))_42%,hsl(var(--p))_47%,hsl(var(--a))_100%)] bg-clip-text [-webkit-text-fill-color:transparent] [@supports(color:oklch(0_0_0))]:bg-[linear-gradient(90deg,hsl(var(--s))_4%,color-mix(in_oklch,hsl(var(--sf)),hsl(var(--pf)))_22%,hsl(var(--p))_45%,color-mix(in_oklch,hsl(var(--p)),hsl(var(--a)))_67%,hsl(var(--a))_100.2%)] text-2xl font-bold">
                {{ roleName }}
              </div>
              <div class="dropdown dropdown-right">
                <button tabindex="0" class="btn btn-circle btn-sm btn-outline border-0">
                  <Icon name="ic:round-repeat" class="text-base font-bold flex-shrink-0" />
                </button>
                <div tabindex="0" class="dropdown-content z-[1] card card-compact shadow">
                  <div class="card-body w-[800px] bg-slate-100 rounded-xl dark:bg-slate-600">
                    <h3 class="card-title">
                      选择预设角色
                    </h3>
                    <div>
                      <input v-model.trim="searchPromptKeyword" type="text" placeholder="请输入关键字查询" class="input input-bordered input-sm w-full max-w-xs">
                    </div>
                    <!-- 列表 -->
                    <div class="max-h-[50vh] overflow-y-auto">
                      <div class="divide-y divide-base-content/20">
                        <div v-for="(item, index) in showPromptList" :key="index" class="py-4 px-4 hover:bg-base-300 hover:cursor-pointer transition-colors duration-300" @click="setCurrentRole(item)">
                          <div class="text-lg pb-2">
                            {{ item[0] }}
                          </div>
                          <div class="text-base text-base-content/80">
                            {{ item[1] }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="flex items-center gap-2">
              <div class="dropdown dropdown-left">
                <button tabindex="0" class="btn btn-xs">
                  {{ currentChat.model }}
                  <Icon name="ic:round-arrow-drop-down" />
                </button>
                <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-md w-50">
                  <li
                    v-for="(item) in models" :key="item" :class="{ 'text-primary': currentChat.model === item }"
                    @click="() => setModel(item)"
                  >
                    <span>{{ item }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <!-- scroll container -->
          <div ref="scrollViewRef" class="flex-1 chat-scroll-view p-4 overflow-y-scroll relative">
            <!-- <ChatUserMessage content="我将为您提供一个寻求指导和建议的人，以管理他们的情绪、压力、焦虑和其他心理健康问题。您应该利用您的认知行为疗法、冥想技巧、正念练习和其他治疗方法的知识来制定个人可以实施的策略" :date="new Date()" />
            <ChatAiMessage content="我将为您提供一个寻求指导和建议的人，以管理他们的情绪、压力、焦虑和其他心理健康问题。您应该利用您的认知行为疗法、冥想技巧、正念练习和其他治疗方法的知识来制定个人可以实施的策略" :date="new Date()" /> -->
            <template v-for="(item, index) in currentChat.messages" :key="item.date.toString()">
              <ChatAiMessage v-if="item.role === GptRole.ASSISTANT" :data="item" :index="index" />
              <ChatUserMessage v-else :data="item" :index="index" />
            </template>
            <!-- AI 当前内容 -->
            <ChatCurrentSpeakConent v-if="aiSpeaking" :content="aiSpeakContent" />
            <ChatEmptyTipView v-if="currentChat.messages.length === 0" />
          </div>
          <div class="p-4">
            <div class="flex gap-3 items-center">
              <!-- 切换带历史和不带历史消息 -->
              <div class="tooltip" data-tip="清空消息">
                <button class="btn btn-circle btn-sm btn-outline border-0" @click="clearChat">
                  <Icon name="ic:baseline-delete-outline" class="text-2xl" />
                </button>
              </div>
              <div class="tooltip" :data-tip="withHistoryMessage ? '不携带历史消息' : '携带历史消息'">
                <button class="btn btn-circle btn-sm btn-outline border-0" :class="{ 'btn-primary': withHistoryMessage }" @click="toggleWithHistory">
                  <Icon name="mi:message-alt" class="text-2xl" />
                </button>
              </div>
              <!-- 清空历史 -->
              <div class="flex flex-1 relative">
                <div class="min-h-[64px] invisible break-words whitespace-pre-wrap">
                  {{ userMessage }}
                </div>
                <textarea
                  v-model.trim="userMessage"
                  row="1"
                  resize="false"
                  class="absolute left-0 top-0 right-0 h-full textarea textarea-xs flex-1 textarea-bordered bg-base-content/10 pl-4 placeholder:leading-[56px] overflow-hidden"
                  placeholder="有问必答，答无不尽，按 Shift+Enter 换行，按 Enter 发送"
                  @keydown="$event => onKeydown($event)"
                />
              </div>
              <div class="flex justify-center items-center">
                <button class="btn btn-primary w-16 h-16 rounded-full" @click="askQuestion">
                  <Icon name="prime:send" class="text-2xl" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <TransitionMessage />
  </div>
</template>

<style>
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
