import { NOT_NEED_LIST, filterCommentText } from "./const"
import { removeDomByList } from "./utils"

const removeComment = () => {
  let count = 0
  document.querySelectorAll('.c-neirong').forEach((dom) => {
    const list = dom.childNodes
    list.forEach((item) => {
      if (item.nodeType === Node.TEXT_NODE && item.nodeValue) {
        item.nodeValue = item.nodeValue?.replace(filterCommentText, '')
        if (!item.nodeValue || ['d', 'D', '牛', '，'].includes(item.nodeValue)) {
          count++
          dom.closest('.ul')?.remove()
        }
      }
    })
  })
  return count
}

export const xianbaoRun = (): number => {
  const strList = ['.nav2-ul', '.article-list.top', '.pop-hongbao-on', '.tishi', '.xiangguan', 'aside', '#commentbox', '.footer']
  removeDomByList(strList)
  document.querySelector('.copyright')?.parentElement?.remove()

  let count = 0
  const zoyeList = document.querySelectorAll('.article-list .title a')
  if (zoyeList.length) {
    zoyeList.forEach((item) => {
      const dom = item as HTMLElement
      const isNoNeed = NOT_NEED_LIST.some((noNeed) => dom.innerText.includes(noNeed))
      if (isNoNeed) {
        count += 1
        dom.closest('.article-list')?.remove()
      }
    })
  } else {
    count = removeComment()
  }
  return count
}
