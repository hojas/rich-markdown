const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
const charactersLength = characters.length

/**
 * 生成 ID
 * @param length
 */
export function genId(length: number = 20) {
  let result = ''
  let counter = 0
  while(counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
    counter += 1
  }
  return result
}
