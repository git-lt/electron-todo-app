<template>
  <div class="flex flex-row w-full h-full overflow-hidden items-stretch safe-padding-right safe-padding-left">
    <div>
      <div class="w-[220px]" />
      <div class="nav-panel">
        <nav class="relative flex flex-col flex-shrink-0 h-full border-r border-base-content/10">
          <div class="p-3 flex-shrink flex flex-col items-stretch gap-[12px]">
            <div class="flex">
              <div class="dropdown dropdown-bottom">
                <label tabindex="0">
                  <div class="flex items-center gap-2 hover:bg-base-content/10 p-1 rounded-md">
                    <div class="avatar placeholder">
                      <div class="bg-indigo-400 text-primary-content w-5 rounded-md">
                        <span class="text-xs">AA</span>
                      </div>
                    </div>
                    <div class="text-base-content/60 text-sm">
                      Aitter
                    </div>
                  </div>
                </label>
                <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-200 rounded-md w-60 border border-base-content/5">
                  <li>
                    <NuxtLink to="/aitter/settings/profile">
                      设置
                    </NuxtLink>
                  </li>
                  <li><a>退出登录</a></li>
                </ul>
              </div>

              <div class="flex-1" />
            </div>
            <div class="flex items-center gap-2">
              <button class="btn btn-sm flex-1">
                <Icon name="line-md:plus" class="text-base-content/80" />
                添加任务
              </button>
              <button class="btn btn-sm w-10">
                <Icon name="line-md:search-twotone" class="text-base-content/80" />
              </button>
            </div>
          </div>
          <div class="flex-grow overflow-y-auto px-[13px] mb-[2px]">
            <BaseNavMenuItem path="/" icon="line-md:check-list-3-filled" name="任务" />
            <BaseNavMenuItem path="/" icon="line-md:computer-twotone" name="看板" />
            <!-- <BaseNavMenuItem path="/" icon="line-md:list-3-filled" name="项目" />
            <BaseNavMenuItem path="/" icon="line-md:clipboard-twotone" name="产品线" /> -->
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
  @apply w-[220px] fixed z-50 bottom-0 left-0 top-0 bg-base-content/5;
}
.main-panel {
  @apply flex flex-col flex-1 min-w-0;
}
.main-content {
  @apply flex flex-col flex-grow relative overflow-auto place-items-stretch;
}
</style>
