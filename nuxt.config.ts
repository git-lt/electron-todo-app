// import type { ElectronOptions } from 'nuxt-electron'

import { envConfig } from './envConfig'

// console.log(envConfig)

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  vite: {
    server: {
      middlewareMode: false,
    },
  },
  sourcemap: {
    server: true,
    client: true,
  },
  build: {
    transpile: ['trpc-nuxt'],
  },
  runtimeConfig: {
    NUXT_AUTH_ORIGIN: envConfig.AUTH_ORIGIN,
  },
  modules: [
    '@sidebase/nuxt-auth',
    'nuxt-lodash',
    '@nuxtjs/tailwindcss',
    'nuxt-icon',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    'nuxt-svgo',
    // ['nuxt-electron', <ElectronOptions>{
    //   include: ['electron', 'server'],
    // }],
  ],
  auth: {
    origin: envConfig.AUTH_ORIGIN,
    enableGlobalAppMiddleware: true,
    enableSessionRefreshPeriodically: false,
    enableSessionRefreshOnWindowFocus: true,
  },
  hooks: {
    // Remove aliases to only have one
    // https://github.com/nuxt/framework/issues/7277
    'prepare:types': function ({ tsConfig }) {
      const aliasesToRemoveFromAutocomplete = ['~~', '~~/*', '@', '@/*', '@@', '@@/*']
      for (const alias of aliasesToRemoveFromAutocomplete) {
        if (tsConfig.compilerOptions!.paths[alias])
          delete tsConfig.compilerOptions!.paths[alias]
      }
    },
  },
  typescript: {
    strict: true,
  },
})

