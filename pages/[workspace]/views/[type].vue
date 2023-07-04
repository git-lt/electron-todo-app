<script lang="ts" setup>
definePageMeta({
  layout: 'main',
})
</script>

<template>
  <div>
    <h1>各种视图</h1>
    <div>{{ $route.params.type }}</div>
    <div>
      项目
      产品线
      周报
      月报
      年报
    </div>
  </div>
</template>
