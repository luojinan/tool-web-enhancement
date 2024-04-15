import { NOT_NEED_LIST, filterCommentText } from "./const"
import { removeDomByList } from "./utils"

interface QaItem {
  question?: string | null
  answer?: string | null
}

const todoubanWithAnswer = (): QaItem[]=>{
  const questionList:QaItem[] = []
  document.querySelectorAll('.g-biaoti').forEach(item=>{
    questionList.push({
      question: item.textContent
    })
  })
  document.querySelectorAll('.g-neirong').forEach((item,index)=>{
    questionList[index].answer = item.textContent
  })
  return questionList
}

const removeComment = () => {
  let count = 0
  document.querySelectorAll('.c-neirong').forEach((dom) => {
    const list = dom.childNodes
    list.forEach((item) => {
      if (item.nodeType === Node.TEXT_NODE && item.nodeValue) {
        item.nodeValue = item.nodeValue?.replace(filterCommentText, '')
        if (!item.nodeValue || ['d', 'D', '牛', '，', ','].includes(item.nodeValue)) {
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

  const qaList = todoubanWithAnswer()
  const originA = document.querySelector('.art-copyright a')
  const originHref = originA?.getAttribute('href'); // 获取原始的 href
  console.log('设置新链接',originHref)
  originA?.setAttribute('href', `${originHref}?qa=${encodeURIComponent(JSON.stringify(qaList))}`);

  // document.querySelector('.art-copyright a')?.addEventListener('click', function() {
  //   // 阻止默认行为，即阻止跳转
  //   // event.preventDefault();
  //   console.log('等待1s后发送数据')
  //   setTimeout(() => {
  //     // 跨域传递数据
  //   console.log('发送数据',qaList)
  //   window.postMessage({ data: qaList }, 'https://www.douban.com');
  //   }, 1000);
  // });
  return count
}
