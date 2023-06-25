<script lang="ts" setup>
import { themeChange } from 'theme-change'

onMounted(() => {
  themeChange(false)
})
useHead({
  title: '任务管理',
  bodyAttrs: {},
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
