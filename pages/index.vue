<script setup lang="ts">
definePageMeta({ auth: false })
const { getSession, signOut } = useAuth()
const router = useRouter()
const data = await getSession()

const onStart = () => {
  if (!data?.user)
    router.push({ path: '/login' })
  else
    router.replace({ path: '/lejian/tasks/assigend' })
}
</script>

<template>
  <div>
    <div class="navbar bg-base-100">
      <div class="navbar-start">
        <div class="dropdown">
          <label tabindex="0" class="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </label>
          <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li><a>首页</a></li>
            <li><a>特点</a></li>
            <li><a>关于</a></li>
          </ul>
        </div>
        <a class="btn btn-ghost normal-case text-xl">TaskMaster</a>
      </div>
      <div class="navbar-center hidden lg:flex">
        <ul class="menu menu-horizontal px-1">
          <li><a>首页</a></li>
          <li><a>特点</a></li>
          <li><a>关于</a></li>
        </ul>
      </div>
      <div class="navbar-end">
        <span v-if="data?.user">{{ data?.user.name }}</span>
        <NuxtLink v-if="!data?.user" to="/login">
          <span class="btn">登录</span>
        </NuxtLink>
        <span v-else class="btn" @click="signOut({ callbackUrl: '/' })">登出</span>
      </div>
    </div>
    <div class="hero min-h-screen bg-base-200">
      <div class="hero-content text-center">
        <div class="max-w-md">
          <SvgoLogo class="text-[100px] inline-block" />
          <h1 class="text-5xl font-bold">
            TASK MASTER
          </h1>
          <p class="py-6">
            Task App是一款具有线性工作流程、团队协作、优先级管理、任务追踪、可视化界面和扩展性的任务管理工具。
          </p>
          <button class="btn btn-primary" @click="onStart">
            立刻开始
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
