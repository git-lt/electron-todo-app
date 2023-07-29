import type { ChatInfo } from '~/types/openai'
import { getAIAnswerWithStream, initOpenAI } from '~/utils/openai'

const openai = initOpenAI()
export default defineEventHandler(async (event) => {
  const body = await readBody<ChatInfo>(event)
  const { messages } = body

  const msgList = messages.map((v) => {
    return { role: v.role, content: v.content }
  })
  console.log(msgList)

  // 返回 json
  // const answer = await getAIAnswer(openai, messages)
  // setHeaders(event, {
  //   'content-type': 'application/json',
  //   'cache-control': 'public, s-maxage=1800, stale-while-revalidate=2400',
  // })
  // return { message: answer }

  // 返回流
  const response = await getAIAnswerWithStream(openai, msgList)
  setHeaders(event, {
    'content-type': 'text/event-stream',
    'connection': 'keep-alive',
  })
  return response.data
})
