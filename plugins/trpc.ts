import { loggerLink } from '@trpc/client'
import { createTRPCNuxtClient, httpBatchLink } from 'trpc-nuxt/client'
import type { AppRouter } from '~/server/trpc/router'

export default defineNuxtPlugin(() => {
  const trpc = createTRPCNuxtClient<AppRouter>({
    links: [
      loggerLink({
        enabled: opts =>
          process.env.NODE_ENV === 'development'
          || (opts.direction === 'down' && opts.result instanceof Error),
      }),
      httpBatchLink({
        url: '/api/trpc',
        // custom fetch implementation that sends the request over IPC to Main process
        // fetch: async (input, init) => {
        //   const req: IpcRequest = {
        //     url: input instanceof URL ? input.toString() : typeof input === 'string' ? input : input.url,
        //     // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
        //     method: input instanceof Request ? input.method : init?.method!,
        //     // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
        //     headers: input instanceof Request ? input.headers : init?.headers!,
        //     // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
        //     body: input instanceof Request ? input.body : init?.body!,
        //   }

        //   // console.log("Sending request to Main process", req)
        //   const resp = await window.api.trpc(req)
        //   // console.log("Got response from Main process", resp)

        //   return new Response(resp.body, {
        //     status: resp.status,
        //     headers: resp.headers,
        //   })
        // },
      }),
    ],
  })
  return {
    provide: {
      trpc,
    },
  }
})
