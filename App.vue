<script lang="ts" setup>
import { useAppStore } from '~/store/app'
const appStore = useAppStore()

useHead({
  title: '任务管理',
  bodyAttrs: {},
  htmlAttrs: {
    'data-theme': () => appStore.isDark ? 'dark' : 'light',
    'class': () => appStore.isDark ? 'dark' : 'light',
  },
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage class="text-base-content" />
  </NuxtLayout>
</template>

<style>
@import url('~/assets/app.css');
</style>
