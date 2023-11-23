import { visit } from 'unist-util-visit'

/**
 * 解析 heading
 * 使 # 后面没有空格也能解析
 * ##title -> <h2>title</h2>
 */
export function parseHeading() {
  return (tree: any) => {
    visit(tree, 'element', (node: any) => {
      if (node.tagName && node.tagName === 'p') {
        const reg = /^##{0,5}[^#]+/
        if (reg.test(node.children[0].value)) {
          const heading = node.children[0].value.match(reg)?.[0]
          if (heading) {
            const level = heading.match(/#/g)?.length
            const title = heading.replace(/#/g, '')
            node.tagName = `h${level}`
            node.children[0].value = title
          }
        }
      }
    })
  }
}
