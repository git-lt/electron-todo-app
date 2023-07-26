import type { ChatMessageRequest } from '~/types/request'
import { appendUserMessage, getAIAnswerWithStream, initOpenAI } from '~/utils/openai'

const openai = initOpenAI()
export default defineEventHandler(async (event) => {
  const body = await readBody<ChatMessageRequest>(event)
  const { message } = body
  const messages = appendUserMessage(message)

  // 返回 json
  // const answer = await getAIAnswer(openai, messages)
  // setHeaders(event, {
  //   'content-type': 'application/json',
  //   'cache-control': 'public, s-maxage=1800, stale-while-revalidate=2400',
  // })
  // return { message: answer }

  // 返回流
  const response = await getAIAnswerWithStream(openai, messages)
  setHeaders(event, {
    'content-type': 'text/event-stream',
    'connection': 'keep-alive',
  })
  return response.data
})
