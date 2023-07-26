import { initOpenAI } from '~/utils/openai'

const openai = initOpenAI()
export default defineEventHandler(async () => {
  const data = await openai.listModels()
  return data
})

