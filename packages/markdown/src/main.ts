import { matter } from 'vfile-matter'
import remarkMath from 'remark-math'
import remarkGfm from 'remark-gfm'
import remarkFrontmatter from 'remark-frontmatter'
import rehypeKatex from 'rehype-katex'
import rehypeHighlight from 'rehype-highlight'
import rehypeMermaid from 'rehype-mermaid'
import mermaid from 'mermaid'

import { parseHeading } from './plugins/heading.ts'
import { parseVideo } from './plugins/video.ts'
import { copyCode, initCodeClipboard } from './plugins/copy-code.ts'
import { parse } from './core'

import type { ParseOptions } from './types'

export { initCodeClipboard }
export type { ParseOptions }

/**
 * 解析 markdown
 * @param content
 * @param options
 */
export function parseMarkdown(content: string, options: ParseOptions = {}) {
  const remarkPlugins = [
    remarkMath,
    remarkGfm,
    [remarkFrontmatter, ['yaml', 'toml']],
    () => (_: any, file: any) => matter(file),
    ...(options.remarkPlugins || []),
  ]

  const rehypePlugins = [
    parseHeading,
    parseVideo,
    rehypeKatex,
    [rehypeMermaid, { strategy: 'pre-mermaid' }],
    [rehypeHighlight, { detect: true }],
    copyCode,
    ...(options.rehypePlugins || []),
  ]

  const vFile = parse(content, {
    remarkPlugins,
    rehypePlugins,
  })

  mermaid.initialize({ theme: 'dark' })

  return {
    data: vFile.data,
    html: String(vFile.value),
  }
}
