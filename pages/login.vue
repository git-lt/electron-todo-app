<script lang="ts" setup>
definePageMeta({
  layout: 'login',
})
</script>

<template>
  <div class="w-80 animate-fadeIn">
    <div class="flex justify-center">
      <div class="avatar">
        <div class="w-24 rounded-full">
          <img src="https://static.aitter.site/upic/2023-06/gNX4Pi.png">
        </div>
      </div>
    </div>
    <div class="pt-3">
      <h1 class="text-center text-lg py-6">
        Log in to Task
      </h1>
      <div class="flex flex-col gap-4">
        <button class="btn btn-block btn-primary">
          Continue with Github
        </button>
        <button class="btn btn-block btn-neutral">
          Continue with Wechat
        </button>
        <button class="btn btn-block btn-neutral">
          Continue with Email
        </button>
      </div>
      <div class="h-20" />
    </div>
  </div>
</template>
