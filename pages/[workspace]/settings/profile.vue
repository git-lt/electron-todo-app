<script lang="ts" setup>
definePageMeta({
  layout: 'setting',
})
</script>

<template>
  <div class="max-w-2xl w-full">
    <div class="pb-6 border-b border-base-content/20 mb-8">
      <div class="text-2xl mb-3">
        个人信息
      </div>
      <div class="text-sm text-base-content/60">
        管理您的个人信息
      </div>
    </div>
    <div class="grid grid-cols-1 ">
      <div class="flex justify-between items-center py-6">
        <div>
          <div class="mb-3">
            头像
          </div>
          <div class="avatar placeholder">
            <div class="bg-neutral rounded-full w-24">
              <span class="text-3xl text-white">K</span>
            </div>
          </div>
        </div>
      </div>
      <div class="flex items-center py-6">
        <div>
          <div class=" mb-3">
            邮箱
          </div>
          <div class="text-sm text-base-content/60">
            hz_liutao@qq.com
          </div>
        </div>
      </div>

      <div class="flex items-center py-6">
        <div class="w-full">
          <div class="mb-3">
            昵称
          </div>
          <input type="text" placeholder="请输入您的昵称" class="input w-full input-sm input-bordered">
        </div>
      </div>
    </div>
  </div>
</template>
