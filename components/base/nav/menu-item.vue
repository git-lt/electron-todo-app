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
  <div class="rounded my-1">
    <NuxtLink :to="path" class="group block rounded hover:bg-base-content/10">
      <span class="flex items-center flex-grow rounded h-[27px] pr-[2px] pl-[6px]">
        <Icon :name="icon" class="mr-[10px] ml-[1px] flex-shrink-0 text-base-content/50 group-hover:text-base-content" />
        <span class="text-[13px] text-base-content/60">{{ name }}</span>
      </span>
    </NuxtLink>
  </div>
</template>
