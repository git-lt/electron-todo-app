import type { GptMessage, GptRole } from '~/types/openai'

export const messages: GptMessage[] = []

export function addMessage(role: GptRole, content: string) {
  messages.push({
    role,
    content,
  })
  // 只保留前10次对话
  const limitMsg = messages.slice(-10)
  return limitMsg
}

