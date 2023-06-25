<template>
  <div class="flex flex-row w-full h-full overflow-hidden items-stretch safe-padding-right safe-padding-left">
    <div>
      <div class="w-[220px]" />
      <div class="nav-panel">
        <nav class="relative flex flex-col flex-shrink-0 h-full border-r border-base-content/20">
          <div class="py-[16px] px-[12px] flex-shrink flex flex-col items-stretch gap-[12px]">
            <NuxtLink to="/aitter/tasks/assigned">
              <div class="flex items-center gap-2">
                <Icon name="line-md:chevron-small-left" class="text-xl" />
                <div class="text-xl">
                  设置
                </div>
                <div />
              </div>
            </NuxtLink>
          </div>
          <ul class="menu">
            <li>
              <h2 class="menu-title">
                <!-- ic:baseline-manage-accounts -->
                <Icon name="ic:round-home-work" class="text-base" />
                工作空间
              </h2>
              <ul>
                <li class="mb-1">
                  <a>产品线</a>
                </li>
                <li class="mb-1">
                  <a>项目</a>
                </li>
                <li class="mb-1">
                  <a>优先级</a>
                </li>
                <li class="mb-1">
                  <a>任务标签</a>
                </li>
                <li class="mb-1">
                  <a>任务分类</a>
                </li>
                <li class="mb-1">
                  <a>任务进度</a>
                </li>
              </ul>
            </li>
            <li>
              <h2 class="menu-title">
                <Icon name="ic:baseline-person-4" class="text-base" />
                <!-- <Icon name="ic:baseline-manage-accounts" class="text-base" /> -->
                个人中心
              </h2>
              <ul>
                <li class="mb-1">
                  <NuxtLink to="/aitter/settings/profile">
                    账号信息
                  </NuxtLink>
                </li>
                <li class="mb-1">
                  <NuxtLink to="/aitter/settings/preferences">
                    偏好设置
                  </NuxtLink>
                </li>
              </ul>
            </li>
          </ul>
          <div class="absolute top-0 bottom-0 w-2 hover:cursor-col-resize z-[97] right-[-4px] after:bg-slate-500 after:block after:absolute after:top-0 after:bottom-0 after:left-[2px] after:w-[2px] after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300 after:ease-in pointer-events-auto" />
        </nav>
      </div>
    </div>
    <div class="main-panel">
      <main class="flex flex-col relative overflow-auto mx-10 mb-12 items-center">
        <div class="h-14" />
        <slot />
      </main>
    </div>
  </div>
</template>

<style scoped>
.nav-panel {
  @apply w-[220px] fixed z-50 bottom-0 left-0 top-0  bg-base-content/5;
}
.main-panel {
  @apply flex flex-col flex-1 min-w-0;
}
</style>
