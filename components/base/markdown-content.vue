<script lang="ts" setup>
import { marked } from 'marked'
// import { markedHighlight } from 'marked-highlight'
import hljs from 'highlight.js'
import { mangle } from 'marked-mangle'
import { gfmHeadingId } from 'marked-gfm-heading-id'
import 'highlight.js/styles/atom-one-dark.css'

const props = defineProps<{ value: string }>()

// marked.use(markedHighlight({
//   langPrefix: 'hljs language-',
//   highlight(code, lang) {
//     const language = hljs.getLanguage(lang) ? lang : 'plaintext'
//     return hljs.highlight(code, { language }).value
//   },
// }))

const renderer = {
  code(code: string, infostring: string, escaped) {
    let codeHtml = code
    if (infostring && infostring === 'html')
      codeHtml = encodeURIComponent(code)

    if (infostring)
      codeHtml = hljs.highlightAuto(code).value

    // console.log(escaped)
    // console.log(code, infostring, escaped, codeHtml)

    return `<div class="bg-black mb-4 rounded-md">
      <div class="code_header flex items-center relative text-gray-200 bg-gray-800 px-4 py-2 text-xs font-sans">
        <span>${infostring || ''}</span>
        <button onclick="copy(this)" class="flex ml-auto gap-2">
          <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
          </svg>
          <span>Copy code</span>
          <code style="display:none">${encodeURIComponent(code)}</code>
        </button>
      </div>
      <div class="p-4 overflow-y-auto">
        <code class="!whitespace-pre hljs language-${infostring}">${codeHtml}</code>
      </div>
    </div>`
  },
  paragraph(text: string) {
    return `<p style="white-space:pre-wrap;">${text}</p>`
  },
}
marked.use(gfmHeadingId({ prefix: 'chat-' }))
marked.use(mangle())
marked.use({ renderer })

// marked.setOptions({
//   renderer: new marked.Renderer(),
//   gfm: true,
//   async: false,
//   highlight(code: string): string {
//     return hljs.highlightAuto(code).value
//   },
// })

const content = computed(() => {
  return marked(props.value)
})
</script>

<template>
  <div v-html="content" />
</template>
