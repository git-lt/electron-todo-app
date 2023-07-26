import { Configuration, OpenAIApi } from 'openai'
import { addMessage } from './message'
import { envConfig } from '~/envConfig'
import { type GptMessage, GptRole } from '~/types/openai'

let openai: OpenAIApi

export function initOpenAI() {
  if (openai)
    return openai

  const configuration = new Configuration({
    apiKey: envConfig.AI_PROXY_KEY,
    basePath: envConfig.AI_PROXY_URL,
  })

  openai = new OpenAIApi(configuration)
  return openai
}

export function appendUserMessage(message: string) {
  return addMessage(GptRole.USER, message)
}

export async function getAIAnswerWithStream(openai: OpenAIApi, messages: GptMessage[]) {
  const chatCompletion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    // model: 'gpt-4',
    stream: true,
    messages,
  }, {
    responseType: 'stream',
  })
  console.log(chatCompletion.status)
  return chatCompletion
}

export async function getAIAnswer(openai: OpenAIApi, messages: GptMessage[]): Promise<string> {
  try {
    const chatCompletion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages,
    })
    const answer = chatCompletion.data.choices[0].message?.content || ''
    answer && addMessage(GptRole.ASSISTANT, answer)
    return answer
  }
  catch (err) {
    return 'openai answered fail'
  }
}
