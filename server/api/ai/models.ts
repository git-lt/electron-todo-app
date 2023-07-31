import { initOpenAI } from '~/utils/openai'

const openai = initOpenAI()
export default defineEventHandler(async (event) => {
  const data = await openai.listModels()
  setHeaders(event, {
    'content-type': 'application/json',
    'cache-control': 'public, s-maxage=1800, stale-while-revalidate=2400',
  })
  return data.data
})

