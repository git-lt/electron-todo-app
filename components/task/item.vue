<script lang="ts" setup>

</script>

<template>
  <div class="flex items-center w-full pl-3 pr-8 text-[13px] h-11">
    <!-- status -->
    <div class="flex items-center">
      <input type="checkbox" checked="checked" class="checkbox checkbox-xs">
      <!-- priority -->
      <div class="mx-1">
        <Icon name="ic:baseline-assignment-late" class="text-base" />
      </div>
      <div class="mx-1">
        ALT-01
      </div>
      <!-- status -->
      <div class="mx-1">
        <Icon name="ic:baseline-history-toggle-off" class="text-base" />
      </div>
    </div>
    <!-- title -->
    <div class="mx-1 text-slate-50">
      界面开发
    </div>

    <!-- progress & project -->
    <div class="flex flex-1 items-center justify-between mx-1">
      <!-- progress -->
      <div class="flex rounded-full items-center p-1 bg-slate-800 border border-slate-700">
        <div class="radial-progress mx-1" style="--value:50; --size:.8rem; --thickness: 2px;" />
        <div class="text-xs ml-1">
          0/3
        </div>
      </div>
      <div />
      <!-- project -->
      <div class="ml-2 py-1 px-2 rounded-full bg-slate-800 border border-slate-700">
        项目名称
      </div>
    </div>
    <!-- Due date -->
    <!-- created date -->
    <div class="ml-2">
      6月22日
    </div>
    <!-- assign -->
    <div class="ml-2">
      <Icon name="ic:baseline-history-toggle-off" />
    </div>
  </div>
</template>
