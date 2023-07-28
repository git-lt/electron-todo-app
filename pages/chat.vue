<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useChatStore } from '~/store/chat'
import { GptRole } from '~/types/openai'

definePageMeta({
  auth: false,
  layout: 'default',
})
const chatStore = useChatStore()

const { currentChat, aiSpeakContent, aiSpeaking, userMessage, roleName, showPromptList, searchPromptKeyword } = storeToRefs(chatStore)
const { onKeydown, askQuestion, setCurrentRole } = chatStore
</script>

<template>
  <div class="h-full flex">
    <div class="w-80 border-r h-full border-base-content/20">
      <div class="p-4 border-b border-base-content/20">
        <button class="btn w-full btn-neutral">
          <Icon name="ic:round-plus" class="text-lg font-bold" /> 新的会话
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
      </div>
    </div>
    <div class="h-full flex justify-center items-center flex-1 py-8">
      <div class="w-[90%] min-w-[640px] max-w-[1200px] h-full bg-base-content/10 rounded-2xl overflow-hidden">
        <div class="flex flex-col h-full">
          <div class="h-20 bg-base-content/10 p-4 flex items-center justify-between">
            <div>{{ roleName }}</div>
            <!-- <button class="btn btn-circle btn-sm btn-outline border-0">
              <Icon name="ic:round-repeat" class="text-base font-bold flex-shrink-0" />
            </button> -->
            <div class="dropdown dropdown-left">
              <button tabindex="0" class="btn btn-circle btn-sm btn-outline border-0">
                <Icon name="ic:round-repeat" class="text-base font-bold flex-shrink-0" />
              </button>
              <div tabindex="0" class="dropdown-content z-[1] card card-compact shadow">
                <div class="card-body w-[800px] bg-slate-600 rounded-2xl">
                  <h3 class="card-title">
                    选择预设角色
                  </h3>
                  <div>
                    <input v-model.trim="searchPromptKeyword" type="text" placeholder="请输入关键字查询" class="input input-bordered input-sm w-full max-w-xs">
                  </div>
                  <!-- 列表 -->
                  <div class="max-h-[50vh] overflow-y-auto">
                    <div class="divide-y divide-base-content/20">
                      <div v-for="(item, index) in showPromptList" :key="index" class="py-4 px-4 hover:bg-base-300 rounded-lg hover:cursor-pointer transition-colors duration-300" @click="setCurrentRole(item)">
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
          <!-- scroll container -->
          <div ref="scrollViewRef" class="flex-1 chat-scroll-view p-4 overflow-y-scroll">
            <!-- <ChatUserMessage content="我将为您提供一个寻求指导和建议的人，以管理他们的情绪、压力、焦虑和其他心理健康问题。您应该利用您的认知行为疗法、冥想技巧、正念练习和其他治疗方法的知识来制定个人可以实施的策略" :date="new Date()" />
            <ChatAiMessage content="我将为您提供一个寻求指导和建议的人，以管理他们的情绪、压力、焦虑和其他心理健康问题。您应该利用您的认知行为疗法、冥想技巧、正念练习和其他治疗方法的知识来制定个人可以实施的策略" :date="new Date()" /> -->
            <template v-for="(item) in currentChat.messages" :key="item.date.toString()">
              <ChatAiMessage v-if="item.role === GptRole.ASSISTANT" :content="item.content" :date="item.date" />
              <ChatUserMessage v-else :content="item.content" :date="item.date" />
            </template>
            <!-- AI 当前内容 -->
            <ChatCurrentSpeakConent v-if="aiSpeaking" :content="aiSpeakContent" />
          </div>
          <div class="p-4">
            <div class="flex gap-3 items-center">
              <!-- 切换带历史和不带历史消息 -->
              <div class="tooltip" data-tip="清空消息">
                <button class="btn btn-circle btn-sm btn-outline border-0">
                  <Icon name="ic:twotone-delete-forever" class="text-2xl" />
                </button>
              </div>
              <div class="tooltip" data-tip="携带历史消息">
                <button class="btn btn-circle btn-sm btn-outline border-0">
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
                  placeholder="有问题尽管问我，按 Shift+Enter 换行，按 Enter 发送"
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
