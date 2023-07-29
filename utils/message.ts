import { random } from 'lodash'
import type { GptMessage, GptRole } from '~/types/openai'
import greetingData from '~/assets/json/greeting.json'
import questions from '~/assets/json/questions.json'

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

export function createMessage(role: GptRole, content: string) {
  return { role, content, date: new Date() }
}

export function getTimeTip() {
  // 获取当前时间
  const currentTime = new Date()
  // 获取当前小时数
  const currentHour = currentTime.getHours()

  // 判断时间段
  let result: keyof typeof greetingData = '早上好'
  if (currentHour >= 0 && currentHour < 5)
    result = '夜深了'

  else if (currentHour >= 5 && currentHour < 8)
    result = '早上好'

  else if (currentHour >= 8 && currentHour < 12)
    result = '上午好'

  else if (currentHour >= 12 && currentHour < 14)
    result = '中午好'

  else if (currentHour >= 14 && currentHour < 18)
    result = '下午好'

  else if (currentHour >= 18 && currentHour < 24)
    result = '晚上好'

  return {
    title: result,
    desc: greetingData[result][random(0, 2)],
  }
}
// 我是你的专属AI伙伴，帮你答疑解惑提供灵感

export function randomQuestions() {
  return [
    questions.common[random(0, 9)],
    questions.medical[random(0, 9)],
    questions.programming[random(0, 9)],
    questions.creative[random(0, 9)],
  ]
}
