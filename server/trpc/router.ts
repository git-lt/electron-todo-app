import { helloWorldRouter } from './routers/helloWorld'
import { userRouter } from './routers/user'
import { router } from './trpc'

export const appRouter = router({
  user: userRouter,
  helloWorld: helloWorldRouter,
})

export type AppRouter = typeof appRouter
