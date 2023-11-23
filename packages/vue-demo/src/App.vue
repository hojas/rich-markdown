<script setup lang="ts">
import MarkdownViewer from './components/MarkdownViewer.vue'
import content from './data.md?raw'
</script>

<template>
  <div class="container">
    <MarkdownViewer :content="content" />
  </div>
</template>

<style>
html, body {
  padding: 0;
  margin: 0;
}

body {
  background: #eee;
}

@media (prefers-color-scheme: dark) {
  body {
    background: #000;
  }
}

.container {
  width: 65%;
  margin: auto;
}

@media screen and (max-width: 1024px) {
  .container {
    width: 90%;
  }
}
</style>
