<script lang="ts" setup>
definePageMeta({
  layout: 'login',
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/',
  },
})

const { signIn } = useAuth()
const showEmail = ref(false)
const email = ref('')
const emailError = ref('')

const EMAIL_REG = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

/**
 * 1. 父子结构，父：height: 0, overflow: hidden
 * 2. 渲染子元素，获取子元素的 offsetHeight
 * 3. 执行动画 height = child.offsetHeight
 * 4. 动画结束，父：height: auto; overflow: visible
 */
const emailInputWrapRef = ref()
const onToggleShowEmailInput = () => {
  if (showEmail.value) {
    // 校验输入
    if (!email.value) {
      emailError.value = '请输入您的邮箱'
      return
    }

    if (!EMAIL_REG.test(email.value)) {
      emailError.value = '邮箱格式不正确'
      return
    }
    signIn('email', { email: email.value, callbackUrl: '/' })
  }
  showEmail.value = true
  nextTick(() => {
    emailInputWrapRef.value.toggle()
  })
}

const onEmailFocus = () => {
  emailError.value = ''
}
</script>

<template>
  <div class="w-80 animate-fadeIn">
    <div class="flex justify-center">
      <SvgoLogo class="text-[100px] inline-block" />
      <!-- <div class="avatar">
        <div class="w-24 rounded-full">
          <img src="https://static.aitter.site/upic/2023-06/gNX4Pi.png">
        </div>
      </div> -->
    </div>
    <div class="pt-3">
      <!-- Log in to Task Master -->
      <h1 class="text-center text-lg py-6">
        登录
      </h1>
      <div class="flex flex-col gap-4">
        <!-- Continue with Github -->
        <button class="btn btn-block btn-primary" @click="signIn('github')">
          Github 登录
        </button>
        <TransitionHeight ref="emailInputWrapRef">
          <div v-if="showEmail" class="pt-1">
            <div class="border-t mb-5 border-gray-700" />
            <!-- Enter your email address... -->
            <input v-model.trim="email" type="text" placeholder="email@example.com" class="input border-gray-600 outline-none w-full max-w-xs" @focus="onEmailFocus">
            <div v-if="emailError" class="mt-1 text-sm pl-1 text-red-400">
              {{ emailError }}
            </div>
          </div>
        </TransitionHeight>

        <!-- Continue with Email -->
        <button class="btn btn-block btn-neutral" @click="onToggleShowEmailInput">
          邮箱登录
        </button>
      </div>
      <div class="h-20" />
    </div>
  </div>
</template>
