import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkStringify from 'remark-stringify'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import type { VFile } from 'vfile'
import type { ParseOptions } from './types'

/**
 * 解析 markdown
 * @param content
 * @param options
 */
export function parse(content: string, options: ParseOptions = {}): VFile {
  const { remarkPlugins = [], rehypePlugins = [] } = options

  return unified()
    .use(remarkParse)
    .use(remarkStringify)
    .use(remarkPlugins)
    .use(remarkRehype)
    .use(rehypePlugins)
    .use(rehypeStringify)
    .processSync(content)
}
