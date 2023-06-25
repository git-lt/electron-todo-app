<script lang="ts" setup>

</script>

<template>
  <div class="group flex items-center w-full pr-4 text-xs h-11 hover:bg-base-content/10">
    <!-- status -->
    <div class="flex items-center">
      <div class="flex justify-center w-8">
        <input type="checkbox" class="checkbox checkbox-xs">
      </div>
      <!-- priority -->
      <div>
        <Icon name="ic:baseline-assignment-late" class="text-base text-base-content/60" />
      </div>
      <div class="ml-2 text-base-content/60">
        ALT-01
      </div>
      <!-- status -->
      <div class="ml-2">
        <Icon name="ic:baseline-history-toggle-off" class="text-base text-base-content/60" />
      </div>
    </div>
    <!-- title -->
    <div class="ml-2 text-sm">
      界面开发
    </div>

    <!-- progress & project -->
    <div class="flex flex-1 items-center justify-between ml-2">
      <!-- progress -->
      <div class="flex rounded-full items-center p-1 border border-base-content/10">
        <div class="radial-progress mx-1" style="--value:50; --size:.8rem; --thickness: 2px;" />
        <div class="text-xs ml-1 text-base-content/60">
          0/3
        </div>
      </div>
      <div />
      <!-- project -->
      <div class="ml-2 py-1 px-2 rounded-full text-xs border border-base-content/10">
        项目名称
      </div>
    </div>
    <!-- Due date -->
    <!-- created date -->
    <div class="ml-2 text-base-content/60">
      6月22日
    </div>
    <!-- assign -->
    <div class="ml-2">
      <Icon name="ic:baseline-history-toggle-off" class="text-base" />
    </div>
    <!-- 拖动排序 -->
    <!-- <div class="ml-2 w-6 opacity-0 group-hover:opacity-1">
      <Icon name="ic:baseline-drag-indicator" class="text-base" />
    </div> -->
  </div>
</template>
