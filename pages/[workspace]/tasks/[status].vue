<script lang="ts" setup>
definePageMeta({
  layout: 'main',
})
// {{ $route.params.workspace }}
//     {{ $route.params.status }}
</script>

<template>
  <div>
    <header class="h-14 pl-8 pr-8 border-b border-slate-700/80 flex items-center">
      <div flex-1>
        <div class="text-sm">
          <span class="text-slate-50">Tasks</span>
          <span class="text-slate-400 mx-1">›</span>
          <span class="text-slate-400">Assigned</span>
        </div>
      </div>
    </header>
    <div>
      <TaskList />
    </div>
  </div>
</template>
