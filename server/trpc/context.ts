import type { inferAsyncReturnType } from '@trpc/server'
import type { H3Event } from 'h3'
import { prisma } from '../prisma'
import { getServerSession } from '#auth'

export const createContext = async (event: H3Event) => {
  const session = await getServerSession(event)
  const status = session ? 'authorized' : 'unauthorized'
  return {
    prisma,
    session,
    status,
  }
}

export type Context = inferAsyncReturnType<typeof createContext>
