import { z } from 'zod'
import { procedure, protectedProcedure, router } from '../trpc'

export const helloWorldRouter = router({
  hello: procedure
    .input(
      z.object({
        text: z.string().nullish(),
      }),
    )
    .query(({ input }) => {
      return {
        greeting: `Hello ${input?.text ?? 'world'}`,
      }
    }),
  helloAuthenticated: protectedProcedure
    .input(
      z.object({
        text: z.string().nullish(),
      }),
    )
    .query(({ input }) => {
      return {
        greeting: `Hello ${input?.text ?? 'world'} (server authenticated this request)`,
      }
    }),
})
