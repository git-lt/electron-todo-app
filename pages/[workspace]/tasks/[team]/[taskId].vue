<script lang="ts" setup>
definePageMeta({
  layout: 'main',
})
</script>

<template>
  <!-- <div>{{ $route.params.team }}</div>
    <div>{{ $route.params.taskId }}</div> -->
  <div class="flex flex-col h-full m-2 rounded-md shadow">
    <!-- card-header -->
    <div class="h-10 pl-4 items-center flex border-b border-base-content/5 ">
      <div class="flex gap-1 items-center">
        <button class="btn btn-ghost btn-xs">
          <Icon name="ic:round-close" class="text-xl" />
        </button>
        <button class="btn btn-square btn-xs">
          <Icon name="ic:round-keyboard-arrow-up" class="text-lg" />
        </button>
        <button class="btn btn-square btn-xs">
          <Icon name="ic:round-keyboard-arrow-down" class="text-lg" />
        </button>
        <div class="tabular-nums text-sm ml-1">
          <span>1</span>
          <span class="text-base-content/50"> / 3</span>
        </div>
      </div>
    </div>
    <!-- card-body -->
    <div class="flex-1 flex">
      <div class="flex-1">
        <div style="width: calc(100% - 120px);" class="mx-auto max-w-3xl">
          <div class="h-14 flex items-center border-b border-base-content/5">
            <button class="btn btn-ghost btn-xs">
              Assigned
            </button>
            <Icon name="ic:round-chevron-right" />
            <button class="btn btn-ghost btn-xs">
              Assigned
            </button>
            <Icon name="ic:round-chevron-right" />
            <button class="btn btn-ghost btn-xs">
              ID
            </button>
          </div>
          <div class="py-4">
            <textarea rows="1" class="w-full textarea textarea-ghost resize-none text-2xl rounded-md">任务标题</textarea>
          </div>
          <textarea rows="2" class="w-full textarea textarea-ghost resize-none text-lg  rounded-md" placeholder="请输入详情" />

          <div class="flex justify-between mt-4 border-b border-base-content/10 mb-2 items-center text-sm">
            <div class="flex py-2">
              <div>子任务</div>
              <div>进度</div>
            </div>
            <div>添加</div>
          </div>
          <div>
            <TaskList />
          </div>
        </div>
      </div>
      <div class="w-80 bg-base-content/5">
        <div class="h-14 px-6 border-b border-base-content/10">
          <div class="flex items-center">
            <div>Team</div>
            <button class="btn btn-ghost btn-sm">
              复制链接
            </button>
            <button class="btn btn-ghost btn-sm">
              复制ID
            </button>
          </div>
        </div>
        <div class="px-6 pb-6 text-sm">
          <div class="flex py-4">
            <div class="w-20 text-base-content/50 mr-2">
              状态
            </div>
            <div class="flex-1 flex items-center  text-base-content/80">
              <Icon name="ic:baseline-data-saver-off" />
              <span class="pl-2">进行中</span>
            </div>
          </div>

          <div class="flex py-4">
            <div class="w-20 text-base-content/50 mr-2">
              状态
            </div>
            <div class="flex-1 flex items-center  text-base-content/80">
              <Icon name="ic:baseline-data-saver-off" />
              <span class="pl-2">优先级</span>
            </div>
          </div>

          <div class="flex py-4">
            <div class="w-20 text-base-content/50 mr-2">
              标签
            </div>
            <div class="flex-1 flex items-center  text-base-content/80">
              <Icon name="ic:baseline-data-saver-off" />
              <span class="pl-2">BUG</span>
            </div>
          </div>

          <div class="flex py-4">
            <div class="w-20 text-base-content/50 mr-2">
              指定
            </div>
            <div class="flex-1 flex items-center  text-base-content/80">
              <Icon name="ic:baseline-data-saver-off" />
              <span class="pl-2">张三</span>
            </div>
          </div>

          <div class="flex py-4 border-t border-base-content/20">
            <div class="w-20 text-base-content/50 mr-2">
              产品
            </div>
            <div class="flex-1 flex items-center  text-base-content/80">
              <Icon name="ic:baseline-data-saver-off" />
              <span class="pl-2">产品</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
