import { visit } from 'unist-util-visit'
import ClipboardJS from 'clipboard'
import { invalidCodeElement } from '../utils/isCodeElement'

/**
 * 生成复制按钮
 * @param value
 */
function genCopyButton(value: string) {
  return {
    type: 'element',
    tagName: 'div',
    properties: {
      className: ['markdown-copy-code-button'],
      dataClipboardText: value,
    },
  }
}

/**
 * 获取代码块内容
 * @param node
 */
function getCode(node: any) {
  let value = ''
  if (node.value)
    value += node.value

  if (node.children) {
    node.children.forEach((item: any) => {
      value += getCode(item)
    })
  }

  return value
}

/**
 * 为代码块添加复制按钮
 */
export function copyCode() {
  return (tree: any) => {
    visit(tree, 'element', (node: any, _: any, parent: any) => {
      if (invalidCodeElement(parent, node))
        return

      // 匹配代码块
      if (node.properties.className?.includes('hljs')) {
        const code = getCode(node)
        parent.children = [
          ...parent.children,
          genCopyButton(code),
        ]
      }
    })
  }
}

/**
 * 初始化代码剪切板
 */
export function initCodeClipboard() {
  const clipboard = new ClipboardJS('.markdown-copy-code-button')
  const timerMap = new WeakMap()

  clipboard.on('success', (e) => {
    const t = timerMap.get(e.trigger)
    if (t)
      clearTimeout(t)

    const copiedClassName = 'copied'
    e.trigger.classList.add(copiedClassName)

    const timer = setTimeout(() => {
      e.trigger.classList.remove(copiedClassName)
    }, 3000)
    timerMap.set(e.trigger, timer)
  })

  return clipboard
}
