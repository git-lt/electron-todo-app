import { defineStore } from 'pinia'
import { useDark, useToggle } from '@vueuse/core'
import type { MessageOptions } from '~/types/common'

const defaultMessageOptions: MessageOptions = {
  visible: false,
  x: 0,
  y: 0,
  zIndex: 1000,
  content: '复制成功',
  theme: 'success',
  distance: -30,
}

export const useAppStore = defineStore('app', () => {
  const messageOptions = reactive<MessageOptions>({ ...defaultMessageOptions })

  const isDark = useDark()
  const toggleDark = useToggle(isDark)
  const { copy } = useClipboard()

  function showMessage(options: Partial<MessageOptions>) {
    messageOptions.x = options.x ?? 0
    messageOptions.y = options.y ?? 0
    messageOptions.visible = true
    messageOptions.content = options.content ?? '复制成功'
  }

  function showCopyToast(content: string, el: HTMLElement) {
    copy(content)
    const { left: x, top: y } = el.getBoundingClientRect()
    showMessage({ x, y })
  }

  return {
    isDark,
    showMessage,
    toggleDark,
    messageOptions,
    showCopyToast,
  }
})
