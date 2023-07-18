<script setup lang="ts">
import { onMounted, ref } from 'vue'
import anime from 'animejs/lib/anime.es.js'

interface Props {
  duration?: number
}
const props = withDefaults(defineProps<Props>(), {
  duration: 150,
})

const emits = defineEmits<{
  (e: 'finish', vsisble: boolean): void
}>()

const innerRef = ref<HTMLDivElement>()
const height = ref<string>('0px')
const transHeight = ref<number>(0)
const inAnimation = ref(false)
const overflow = ref('hidden')

onMounted(() => {
  const innerH = innerRef.value?.offsetHeight || 0
  height.value = innerH > 0 ? 'auto' : '0px'
  overflow.value = innerH > 0 ? 'visible' : 'hidden'
})

function toggle() {
  if (inAnimation.value)
    return

  const innerHeight = innerRef.value?.offsetHeight || 0
  const currentHeight = overflow.value === 'visible' ? innerHeight : 0
  const targetHeight = overflow.value === 'visible' ? 0 : innerHeight

  // 2. 执行动画
  const targets = {
    height: currentHeight,
  }
  anime({
    targets,
    height: targetHeight,
    easing: 'linear',
    duration: props.duration,
    begin: () => {
      inAnimation.value = true
      overflow.value = 'hidden'
    },
    update: () => {
      // 更新高度
      transHeight.value = targets.height
    },
    complete: () => {
      inAnimation.value = false
      if (targetHeight > 0) {
        overflow.value = 'visible'
        height.value = 'auto'
      }
      else {
        height.value = '0px'
      }
      emits('finish', targetHeight > 0)
    },
  })
}
defineExpose({
  toggle,
})
</script>

<template>
  <div :style="{ height: inAnimation ? `${transHeight}px` : height, overflow }">
    <div ref="innerRef">
      <slot />
    </div>
  </div>
</template>
