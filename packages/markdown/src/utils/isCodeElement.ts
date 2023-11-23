/**
 * 检查 node 是否为 parent 为 pre 的 code 标签
 * @param parent
 * @param node
 */
export function invalidCodeElement(parent: any, node: any) {
  return !parent
    || !('tagName' in parent)
    || parent.tagName !== 'pre'
    || node.tagName !== 'code'
    || !node.properties
}
