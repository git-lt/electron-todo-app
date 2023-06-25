<script lang="ts" setup>
definePageMeta({
  layout: 'main',
})
// {{ $route.params.workspace }}
//     {{ $route.params.status }}
</script>

<template>
  <div>
    <header class="h-14 pl-8 pr-8 border-b border-base-content/10 flex items-center">
      <div flex-1>
        <div class="text-sm">
          <span>Tasks</span>
          <span class="text-base-content/60 mx-1">›</span>
          <span class="text-base-content/60">Assigned</span>
        </div>
      </div>
    </header>
    <div class="flex py-2 pl-8 border-b border-base-content/20">
      <BaseFilterTaskStatus />
      <div class="pl-4" />
      <button class="btn btn-xs text-base-content/80">
        <Icon name="ic:baseline-plus" />
        过滤
      </button>
    </div>
    <div>
      <TaskList />
    </div>
  </div>
</template>
