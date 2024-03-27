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
  // 移除元素 如fl链接是异步生成的，此时可能没有移除成功，1s后尝试二次移除
  setTimeout(() => {
    removeDomByList(strList)
  }, 1000);
  document.querySelector('.copyright')?.parentElement?.remove()

  document.querySelector('.art-copyright a')?.setAttribute('target', '_self');

  let count = 0
  const zoyeList = document.querySelectorAll('.article-list .title a')
  if (zoyeList.length) {
    zoyeList.forEach((item) => {
      item.setAttribute('target', '_self')
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
