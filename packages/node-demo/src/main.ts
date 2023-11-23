import { parseMarkdown } from 'rich-markdown'
import content from './data.md?raw'

function parse(content: string) {
  content = decodeURIComponent(content)
  // eslint-disable-next-line no-console
  const res = parseMarkdown(content)
  // eslint-disable-next-line no-console
  console.log(res)
}

parse(content)
