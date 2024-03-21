import { filterCommentText } from "./const"
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
  const strList = ['.nav2-ul', '.article-list.top', '.pop-hongbao-on', '.tishi', '.xiangguan', 'aside', '#commentbox', 'footer']
  removeDomByList(strList)
  document.querySelector('.copyright')?.parentElement?.remove()
  const count = removeComment()
  return count
}
