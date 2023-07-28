<script lang="ts" setup>
defineProps<{
  content: string
}>()
</script>

<template>
  <div class="flex justify-start p-4 mr-20 text-sm ">
    <div class="flex items-start  w-full">
      <div class="avatar placeholder mr-4">
        <div class="text-green-400 rounded-full w-12 text-3xl">
          <Icon name="simple-icons:openai" />
        </div>
      </div>
      <div class="rounded-lg bg-slate-100 text-slate-800 px-4 py-2 text-sm animate-fadeIn">
        <BaseMarkdownContent :value="content" />
      </div>
    </div>
  </div>
</template>
