import { TRPCError, initTRPC } from '@trpc/server'
import type { Context } from '~/server/trpc/context'

// You can use any variable name you like.
// We use t to keep things simple.
const t = initTRPC.context<Context>().create()

const authMiddleware = t.middleware(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user)
    throw new TRPCError({ code: 'UNAUTHORIZED' })

  return next({
    ctx: {
      session: {
        ...ctx.session,
        user: ctx.session.user,
      },
    },
  })
})

const { router, middleware, procedure } = t
const protectedProcedure = procedure.use(authMiddleware)
export { router, middleware, procedure, protectedProcedure }
