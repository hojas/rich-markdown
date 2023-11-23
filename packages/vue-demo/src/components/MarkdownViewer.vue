<script setup lang="ts">
import { ref, watchEffect, onMounted, onBeforeUnmount } from 'vue'
import { parseMarkdown, initCodeClipboard } from 'rich-markdown'
import 'rich-markdown/dist/theme/default.css'

const props = defineProps<{ content: string }>()

const html = ref('')
const clipboard = ref()

watchEffect(async () => {
  html.value = parseMarkdown(props.content).html
})

onMounted(() => {
  clipboard.value = initCodeClipboard()
})

onBeforeUnmount(() => clipboard.value?.destroy())
</script>

<template>
  <div class="markdown-body" v-html="html"></div>
</template>

<style scoped>
.markdown-body {
  padding: 30px;
}
</style>
