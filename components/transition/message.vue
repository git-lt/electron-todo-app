<script lang="ts" setup>
import anime from 'animejs/lib/anime.es.js'
import { useAppStore } from '~/store/app'

const appStore = useAppStore()
const { x, visible, y, zIndex, content, theme, distance } = toRefs(appStore.messageOptions)
const inAnimation = ref(false)

watch(visible, (v) => {
  if (v && !inAnimation.value)
    showMessage()
})

const aniStyle = reactive({
  transform: 'translateY(0px)',
  opacity: 0,
  zIndex: zIndex.value,
  left: `${x.value}px`,
  top: `${y.value}px`,
})

function showMessage() {
  aniStyle.left = `${x.value}px`
  aniStyle.top = `${y.value}px`
  const targets = {
    distance: 0,
    opacity: 0,
  }

  anime({
    targets,
    distance: distance.value,
    opacity: 1,
    easing: 'easeOutQuart',
    duration: 500,
    begin: () => {
      inAnimation.value = true
    },
    update: () => {
      aniStyle.transform = `translateY(${targets.distance.toFixed(3)}px)`
      aniStyle.opacity = targets.opacity
    },
    complete: () => {
      inAnimation.value = false
      aniStyle.transform = 'translateY(0px)'
      aniStyle.left = '-100px'
      aniStyle.top = '-100px'
      aniStyle.opacity = 0
      appStore.messageOptions.visible = false
    },
  })
}
</script>

<template>
  <div class="fixed rounded-lg text-white shadow-sm text-sm p-1" :style="aniStyle" :class="[theme]">
    {{ content }}
  </div>
</template>

<style scoped>
/* .sm {
  @apply ;
}
.md {
  @apply text-base py-1 px-2
} */
.info {
  @apply bg-sky-400
}
.error {
  @apply bg-rose-400
}
.warning {
  @apply bg-orange-400
}
.success {
  @apply bg-green-400
}
</style>
