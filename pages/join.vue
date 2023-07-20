<script lang="ts" setup>
definePageMeta({
  layout: 'empty',
  auth: false,
})
</script>

<template>
  <div class="hero min-h-screen bg-base-200">
    <div class="w-[640px] text-left">
      <div class="card w-full bg-base-100 shadow-xl">
        <div class="card-body">
          <div>
            <h1 class="text-2xl mb-8">
              创建工作空间
            </h1>
            <p class="text-base-content/80 mb-6">
              工作空间是共享环境，团队可以在其中管理项目、处理任务、查看进度等
            </p>
            <div>
              <label for="">工作空间名称</label>
              <div class="my-2 mb-6">
                <input type="text" autocomplete="off" class="input input-bordered w-full bg-base-content/10">
              </div>

              <label for="">工作空间网址</label>
              <div class="my-2 relative">
                <div class="text-base-content/50 absolute top-3 left-2">
                  task.app/
                </div>
                <input type="text" class="input input-bordered w-full pl-20 bg-base-content/10">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="py-10 text-center">
        <button class="btn btn-primary w-80">
          创建
        </button>
      </div>
    </div>
  </div>
</template>
