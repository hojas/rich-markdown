import { visit } from 'unist-util-visit'
import videojs from 'video.js'
import { genId } from '../utils/genId'
import { invalidCodeElement } from '../utils/isCodeElement'

/**
 * 判断是否为视频链接
 * @param url
 */
export function isValidVideoUrl(url: string): boolean {
  return /^https?:\/\/.+\.\w+$/.test(url.trim())
}

/**
 * 生成 source 列表
 * @param list
 */
function genSourceList(list: string[]) {
  return list.map((item) => {
    const res = /\.(\w+)$/.exec(item)
    let type = res?.length ? res[1] : 'mp4'
    if (type === 'flv')
      type = 'x-flv'
    else if (type === 'm3u8')
      type = 'x-mpegURL'

    return {
      type: 'element',
      tagName: 'source',
      properties: {
        type: `video/${type}`,
        src: item,
      },
    }
  })
}

/**
 * 生成 video 标签
 * @param list
 */
export function genVideoElement(list: string[]) {
  const children = genSourceList(list)
  return {
    type: 'element',
    tagName: 'video',
    properties: {
      id: `markdown-video-${genId()}`,
      className: ['video-js', 'markdown-video-js'],
      preload: 'auto',
      controls: 'true',
    },
    children,
  }
}

/**
 * 初始化播放器
 * @param id
 */
export function initVideoPlayer(id: string) {
  // 仅在浏览器环境下渲染播放器
  if (typeof document === 'undefined')
    return

  // 初始化播放器
  const timer = setInterval(() => {
    const el = document.querySelector(`#${id}`)
    if (el) {
      videojs(el)
      clearInterval(timer)
    }
  }, 300)
}

/**
 * 解析视频
 */
export function parseVideo() {
  return (tree: any) => {
    visit(tree, 'element', (node: any, _: any, parent: any) => {
      if (invalidCodeElement(parent, node))
        return

      // 匹配 video 代码块
      if (node.properties.className?.includes('language-video')) {
        parent.tagName = 'p'
        const list: string[] = []
        node.children.forEach((item: any) => {
          const sourceList: string[] = item.value.split(/\n+/).filter((val: string) => isValidVideoUrl(val))
          list.push(...sourceList)
        })
        const videoElement = genVideoElement(list)
        parent.children = [videoElement]
        initVideoPlayer(videoElement.properties.id)
      }
    })
  }
}
