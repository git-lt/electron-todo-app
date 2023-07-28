<script lang="ts" setup>
import { useChatStore } from '~/store/chat'
defineProps<{ index: number }>()
const chatStore = useChatStore()
const { editMessageItem, copyMessageItem, deleteMessageItem } = chatStore
</script>

<template>
  <div class="flex gap-1">
    <ChatToolBtn icon="ic:twotone-mode-edit" name="编辑" @click="editMessageItem(index)" />
    <ChatToolBtn icon="ic:twotone-copy-all" name="复制" @click="copyMessageItem(index)" />
    <ChatToolBtn icon="ic:twotone-delete-forever" name="删除" @click="deleteMessageItem(index)" />
  </div>
</template>
