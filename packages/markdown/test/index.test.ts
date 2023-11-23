import { expect, it } from 'vitest'
import { parseMarkdown } from '../src/main'

it('marked works', () => {
  {
    const str = '## title'
    const result = parseMarkdown(str)

    expect(result.html).toBe('<h2>title</h2>')
  }

  const str = '##title'
  const result = parseMarkdown(str)
  expect(result.html).toBe('<h2>title</h2>')
})

it('get meta', () => {
  const str = '---\nshow: step\n---\n\n# title\n'
  const result = parseMarkdown(str)

  expect(result.data.matter).toStrictEqual({ show: 'step' })
})

it('render video', () => {
  const str = '```video\nurl\n```\n'
  const result = parseMarkdown(str)

  const id = result.html && result.html.match(/id="markdown-video-(\w+)"/)?.[1]
  expect(
    result.html,
  ).toBe(`<p><video id="markdown-video-${id}" class="video-js markdown-video-js" preload="auto" controls></video></p>`,
  )
})

it('render katex inline', () => {
  const str = '$a=b$'
  const result = parseMarkdown(str)

  expect(
    result.html,
  ).toBe(
    '<p><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>a</mi><mo>=</mo><mi>b</mi></mrow><annotation encoding="application/x-tex">a=b</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.4306em;"></span><span class="mord mathnormal">a</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:0.6944em;"></span><span class="mord mathnormal">b</span></span></span></span></p>',
  )
})

it('render katex block', () => {
  const str = '$$\na=b\n$$'
  const result = parseMarkdown(str)

  expect(
    result.html,
  ).toBe(
    '<span class="katex-display"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mi>a</mi><mo>=</mo><mi>b</mi></mrow><annotation encoding="application/x-tex">a=b</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.4306em;"></span><span class="mord mathnormal">a</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:0.6944em;"></span><span class="mord mathnormal">b</span></span></span></span></span>',
  )
})
