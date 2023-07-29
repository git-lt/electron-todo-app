<script lang="ts" setup>
import { useChatStore } from '~/store/chat'
import { GptRole } from '~/types/openai'
defineProps<{ index: number; role: GptRole }>()
const chatStore = useChatStore()
const { editMessageItem, copyMessageItem, deleteMessageItem, reAnswer } = chatStore
</script>

<template>
  <div class="flex gap-1">
    <ChatToolBtn v-if="role === GptRole.ASSISTANT" icon="ic:outline-refresh" name="重答" @click="reAnswer(index)" />
    <ChatToolBtn icon="ic:twotone-mode-edit" name="编辑" @click="editMessageItem(index)" />
    <ChatToolBtn icon="ic:twotone-copy-all" name="复制" @click="($event) => copyMessageItem(index, $event)" />
    <ChatToolBtn icon="ic:twotone-delete-forever" name="删除" @click="deleteMessageItem(index)" />
  </div>
</template>
