# rich-markdown

功能丰富的 markdown 解析工具。

## 特色功能

- 元信息解析
- 代码高亮
- 视频播放
- 数学公式
- mermaid 流程图

## 在 Vue 3 中使用

创建 MarkdownViewer.vue 组件：

```html

<script setup lang="ts">
  import { ref, watchEffect, onBeforeUnmount, onMounted } from 'vue'
  import { parseMarkdown, initCodeClipboard } from 'rich-markdown'
  
  // 根据环境自动切换暗黑模式和亮白模式
  import 'rich-markdown/dist/theme/default.css'
  
  // 暗黑模式
  // import 'rich-markdown/dist/theme/dark.css'
  
  // 亮白模式
  // import 'rich-markdown/dist/theme/light.css'

  const props = defineProps<{ content: string }>()

  const html = ref('')
  const codeClipboard = ref()

  watchEffect(async () => {
    const res = await parseMarkdown(props.content)
    html.value = res.html
  })

  onMounted(() => {
    // 初始化复制代码按钮
    codeClipboard.value = initCodeClipboard()
  })

  // 销毁复制代码 clipboard 对象
  onBeforeUnmount(() => codeClipboard.value?.destroy())
</script>

<template>
  <div class="markdown-body" v-html="html"></div>
</template>

<style scoped>
  .markdown-body {
    padding: 30px;
  }
</style>
```

使用组件：

```html
<script setup lang="ts">
import { ref } from 'vue'
import MarkdownViewer from './components/MarkdownViewer.vue'

const content = ref('# hello')
</script>

<template>
  <MarkdownViewer :content="content" />
</template>
```

## API

### parseMarkdown(value[, options])

转化 markdown 字符串为 html 字符串。

#### 参数

**value**: markdown 字符串

**options**: 配置项

- remarkPlugins: remark 插件列表， 默认值为 `[]`
- rehypePlugins: rehype 插件列表， 默认值为 `[]`

#### 返回值

返回一个 Promise 对象，包含以下属性：

- data: markdown 中的 matter 数据
- html: 转化后的 html 字符串

### initCodeClipboard()

初始化代码块复制按钮。

#### 返回值

返回 ClipboardJS 对象。Vue 中使用需在组件销毁前调用 destroy 方法：

```html
<script setup lang="ts">
  import { onMounted, onBeforeUnmount } from 'vue'
  import { initCodeClipboard } from 'rich-markdown'

  const clipboard = ref()
  
  onMounted(() => {
    clipboard.value = initCodeClipboard()
  })

  onBeforeUnmount(() => {
    clipboard.value?.destroy()
  })
</script>
```

## 功能示例

### 1. 解析文档元信息

```text
---
version: 1.0
---

# Hello

```

parseMarkdown 解析后得到结果为：

```javascript
{
    data: { matter: { version: 1 } },
    html: '<h1>Hello</h1>',
}
```

### 2. 代码块高亮

> 使用 highlight.js 高亮代码。

``` python
@requires_authorization
def somefunc(param1='', param2=0):
    '''A docstring'''
    if param1 > param2: # interesting
        print 'Greater'
    return (param2 - param1 + 1) or None
class SomeClass:
    pass
>>> message = '''interpreter
... prompt'''
```

## 3. 视频

> 使用 video.js 播放视频。

用法：

````text
```video
https://download.samplelib.com/mp4/sample-30s.mp4
```
````

效果如下：

```video
https://download.samplelib.com/mp4/sample-30s.mp4
```

### 4. 数学公式

> 使用 Katex 解析公式。

用法：

```text
可以创建行内公式，例如 $\Gamma(n) = (n-1)!\quad\forall n\in\mathbb N$。或者块级公式：

$$
x = \dfrac{-b \pm \sqrt{b^2 - 4ac}}{2a}
$$
```

效果如下：

可以创建行内公式，例如 $\Gamma(n) = (n-1)!\quad\forall n\in\mathbb N$。或者块级公式：

$$
x = \dfrac{-b \pm \sqrt{b^2 - 4ac}}{2a}
$$

### 5. mermaid

使用 mermaid 渲染流程图：

````text
```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```
````

效果如下：

```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```
