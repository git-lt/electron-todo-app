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

export const parsePack = (str: string) => {
  console.log(str)
  // 定义正则表达式匹配模式
  const pattern = /data:\s*({.*?})\s*\n/g
  // 定义一个数组来存储所有匹 配到的 JSON 对象
  const result = []
  // 使用正则表达式匹配完整的 JSON 对象并解析它们
  let match
  while ((match = pattern.exec(str)) !== null) {
    const jsonStr = match[1]
    try {
      const json = JSON.parse(jsonStr)
      result.push(json)
    }
    catch (e) {
      console.log(e)
    }
  }
  // 输出所有解析出的 JSON 对象
  return result
}
