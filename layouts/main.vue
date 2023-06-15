<template>
  <div class="flex flex-row w-full h-full overflow-hidden items-stretch safe-padding-right safe-padding-left">
    <div>
      <div class="w-[220px]" />
      <div class="nav-panel">
        <nav class="relative flex flex-col flex-shrink-0 h-full border-r border-slate-700/80">
          <div class="py-[16px] px-[12px] flex-shrink flex flex-col items-stretch gap-[12px]">
            <div class="flex items-center gap-2">
              <div class="avatar placeholder">
                <div class="bg-indigo-400 text-slate-50 w-6 mask mask-squircle">
                  <span class="text-xs text-[12px]">AA</span>
                </div>
              </div>
              <div class="text-neutral-content text-[13px]">
                Aitter
              </div>
              <div />
            </div>
            <div class="flex items-center gap-2">
              <button class="btn btn-neutral btn-sm flex-1">
                <Icon name="line-md:plus" class="text-neutral-content" />
                添加任务
              </button>
              <button class="btn btn-neutral btn-sm w-10">
                <Icon name="line-md:search-twotone" class="text-neutral-content" />
              </button>
            </div>
          </div>
          <div class="flex-grow overflow-y-auto px-[13px] mb-[2px]">
            <BaseNavMenuItem path="/" icon="line-md:check-list-3-twotone" name="任务列表" />
            <BaseNavMenuItem path="/" icon="line-md:clipboard-list" name="看板视图" />
          </div>
          <div class="absolute top-0 bottom-0 w-2 hover:cursor-col-resize z-[97] right-[-4px] after:bg-slate-500 after:block after:absolute after:top-0 after:bottom-0 after:left-[2px] after:w-[2px] after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300 after:ease-in pointer-events-auto" />
        </nav>
      </div>
    </div>
    <div class="main-panel">
      <main class="main-content">
        <slot />
      </main>
    </div>
  </div>
</template>

<style scoped>
.nav-panel {
  @apply w-[220px] fixed z-50 bottom-0 left-0 top-0;
}
.main-panel {
  @apply flex flex-col flex-1 min-w-0;
}
.main-content {
  @apply flex flex-col flex-grow relative overflow-auto place-items-stretch;
}
</style>
