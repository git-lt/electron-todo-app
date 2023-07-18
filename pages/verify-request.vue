<script lang="ts" setup>
definePageMeta({
  auth: false,
  layout: 'empty',
})
</script>

<template>
  <div class="hero min-h-screen bg-base-200">
    <div class="hero-content text-center">
      <div class="max-w-md flex flex-col items-center">
        <!-- <div class="bg-gradient-to-bl from-primary to-primary/50  rounded-full w-32 h-32 flex justify-center items-center mb-6">
          <SvgoLogo class="text-[90px] inline-block !mb-0" />
        </div> -->
        <h1 class="text-2xl font-bold">
          邮件已发送，请前往邮箱进行验证
        </h1>
        <p class="py-6">
          我们已经向您的邮箱发送了一份验证邮件，请前往邮箱进行验证操作。
        </p>
        <button class="btn btn-primary">
          <NuxtLink to="/">
            回到首页
          </NuxtLink>
        </button>
      </div>
    </div>
  </div>
  <!-- <div>
    <div>
      <h1>邮件已发送，请前往邮箱进行验证</h1>
      <p>我们已经向您的邮箱发送了一份验证邮件，请前往邮箱进行验证操作</p>
    </div>
  </div> -->
</template>
