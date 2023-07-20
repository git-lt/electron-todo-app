<script lang="ts" setup>
definePageMeta({
  layout: 'main',
})

const { c } = useMagicKeys()

whenever(c, () => {
  window.JSEditTaskDialog.showModal()
})

const showEditModal = () => {
  console.log(window.JSEditTaskDialog)
  window.JSEditTaskDialog.showModal()
}
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
    <div class="flex py-2 pr-1 pl-8 border-b border-base-content/20 w-full">
      <div class="flex flex-1">
        <BaseFilterTaskStatus />
        <div class="pl-4" />
        <button class="btn btn-xs text-base-content/80">
          <Icon name="ic:baseline-plus" />
          过滤
        </button>
      </div>
      <button class="btn btn-xs text-base-content/80" @click="showEditModal">
        <Icon name="ic:round-plus" class="text-xl" />
      </button>
    </div>
    <div>
      <TaskList />
    </div>
    <TaskEditModal />
  </div>
</template>
