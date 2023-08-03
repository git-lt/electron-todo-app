<script lang="ts" setup>
import { useChatStore } from '~/store/chat'
const greeting = getTimeTip()
const questions = ref(randomQuestions())
const refreshLoading = ref(false)
const removeAnimateCls = ref(false)

const chatStore = useChatStore()
const { quickAskQuestion } = chatStore

async function refreshQuestion() {
  refreshLoading.value = true
  await delay(2000)
  removeAnimateCls.value = false
  refreshLoading.value = false
  questions.value = randomQuestions()
}

watch(questions, async (v) => {
  await delay(4000)
  removeAnimateCls.value = true
}, {
  immediate: true,
})
</script>

<template>
  <div class="p-8">
    <div class="text-2xl mb-4">
      Hi {{ greeting.title }}
    </div>
    <!-- 作为你的AI伙伴，我可以为你提供各种创作灵感 -->
    <!-- 我是你的专属AI伙伴，帮你答疑解惑提供灵感 -->
    <div class="text-base text-base-content/80 mb-4">
      {{ greeting.desc }} 我是你的专属AI伙伴，我可以根据你的个性化需求，提供专属决策推荐
    </div>
    <div class="flex justify-between py-2 mb-2  w-8/12">
      <div>你可以试着问我:</div>
      <div class="flex text-sm gap-1 hover:text-purple-400 hover:cursor-pointer" @click="refreshQuestion">
        <Icon name="ant-design:reload-outlined" class="text-xl" :class="{ 'animate-spin': refreshLoading }" />
        换一换
      </div>
    </div>
    <div>
      <div v-for="(item, index) in questions" :key="index" class="group rounded-md mb-2 p-2 bg-base-content/10 w-8/12 pr-10 relative hover:bg-base-content/50 duration-300 transition-colors hover:cursor-pointer" :style="{ 'animation-delay': `${index * 0.3}s`, 'backface-visibility': 'visible' }" :class="{ 'animate-flipInX': !removeAnimateCls }" @click="quickAskQuestion(item)">
        {{ item }}
        <Icon name="ic:baseline-arrow-forward" class="absolute top-3 right-3 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 duration-300" />
      </div>
    </div>
    <!-- <div>
      <h3>AI创作</h3>
      <ul>
        <li />
        <li>帮我写一篇跑步文案，重点提炼自律和健康</li>
        <li>帮我写一个首关于秋天的诗</li>
      </ul>
    </div>
    <div>
      <h3>智能编程</h3>
      <ul>
        <li>如何用Javascript发出HTTP请求?</li>
        <li>请使用TS写一个快速排序功能</li>
        <li>如何学习编程、如何学习新的语言？</li>
      </ul>
    </div>
    <div>
      <h3>生活助手</h3>
      <ul>
        <li>我是电商运营，请帮我写一份周报</li>
        <li>拖延症重度患者怎样自救</li>
        <li>我想买一辆30万左右的新能源车，推荐一下</li>
      </ul>
    </div> -->
  </div>
</template>
