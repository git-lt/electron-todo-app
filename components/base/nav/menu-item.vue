<script lang="ts" setup>
import type { RouteLocationRaw } from 'vue-router'

interface Props {
  path: RouteLocationRaw
  icon: string | number | symbol | (string & {})
  name: String
}
defineProps<Props>()
</script>

<template>
  <div class="rounded my-[1px]">
    <NuxtLink :to="path" class="group block rounded hover:bg-slate-700">
      <span class="flex items-center flex-grow rounded h-[27px] pr-[2px] pl-[6px]">
        <Icon :name="icon" class="mr-[10px] ml-[1px] flex-shrink-0 text-slate-400 group-hover:text-slate-50" />
        <span class="text-[13px] text-neutral-content">{{ name }}</span>
      </span>
    </NuxtLink>
  </div>
</template>
