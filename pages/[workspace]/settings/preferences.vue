<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useAppStore } from '~/store/app'
const appStore = useAppStore()
const { isDark } = storeToRefs(appStore)

definePageMeta({
  layout: 'setting',
})
</script>

<template>
  <div class="max-w-2xl w-full">
    <div class="pb-6 border-b mb-8  border-base-content/20">
      <div class="text-2xl mb-3">
        偏好设置
      </div>
      <div class="text-sm text-base-content/60">
        设置您的日常使用习惯
      </div>
    </div>
    <div class="grid grid-cols-1 divide-y divide-base-content/10">
      <div class="flex justify-between items-center py-6">
        <div>
          <div class="mb-3">
            字体大小
          </div>
          <div class="text-sm text-base-content/60">
            调整界面的字体大小
          </div>
        </div>
        <div>
          <select class="select w-full max-w-xs select-sm">
            <option>默认</option>
            <option>较小</option>
            <option>较大</option>
          </select>
        </div>
      </div>
      <div class="flex justify-between items-center py-6">
        <div>
          <div class="mb-3">
            主题
          </div>
          <div class="text-sm text-base-content/60">
            选择一个自定义的主题配置
          </div>
        </div>
        <div>
          <select class="select w-full max-w-xs select-sm" :value="isDark ? 'dark' : 'light'">
            <option value="light">
              Light
            </option>
            <option value="dark">
              Dark
            </option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>
