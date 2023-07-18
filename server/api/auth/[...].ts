import GithubProvider from 'next-auth/providers/github'
import EmailProvider from 'next-auth/providers/email'
// import Auth0Provider from 'next-auth/providers/auth0'

import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { NuxtAuthHandler } from '#auth'
import { envConfig } from '~/envConfig'
import { prisma } from '~/server/prisma'

export default NuxtAuthHandler({
  adapter: PrismaAdapter(prisma),
  secret: envConfig.AUTH_NUXT_SECRET,
  pages: {
    signIn: '/login',
    verifyRequest: '/verify-request',
  },
  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    GithubProvider.default({
      // https://github.com/settings/developers
      clientId: envConfig.AUTH_GITHUB_CLIENT_ID,
      clientSecret: envConfig.AUTH_GITHUB_CLIENT_SECRET,
    }),
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    EmailProvider.default({
      // server: envConfig.AUTH_EMAIL_SERVER,
      // from: envConfig.AUTH_EMAIL_FROM,
      server: {
        host: envConfig.AUTH_EMAIL_HOST,
        port: Number(envConfig.AUTH_EMAIL_PORT),
        secure: true,
        auth: {
          user: envConfig.AUTH_EMAIL_USER,
          pass: envConfig.AUTH_EMAIL_PASS,
        },
      },
      from: envConfig.AUTH_EMAIL_FROM,
      // sendVerificationRequest({
      //   identifier: '',
      //   url: '',

      // })
    }),
  ],
})
