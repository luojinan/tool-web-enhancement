import './style.css';
import { removeDomByList } from './utils';

(() => {
  console.log('nothing to do', location.host)
  // 脚本执行实际在页面后，因此loading没有意义，脚本执行的多快取决于原页面加载，如果原页面加载久就会看到原页面久，然后闪到新样式
  const app = document.createElement('div');

  app.innerHTML = `<div class="fixed top-0 left-0 right-0 bottom-0 bg-black text-white">
  <div class="animate-bounce duration-1000 my-10 text-center">loading...</div>
</div>`
  document.body.append(app);

  let count = 0
  const filterText = /(d{2,})|谢谢姐妹|滴滴|谢谢|!|！|\s|(^[a-zA-Z]+$)|(^\d+$)/gi // 过滤2个以上的d和谢谢

  if (location.host === 'new.xianbao.fun') {
    const removeComment = () => {
      document.querySelectorAll('.c-neirong').forEach((dom) => {
        const list = dom.childNodes
        list.forEach((item) => {
          if (item.nodeType === Node.TEXT_NODE && item.nodeValue) {
            item.nodeValue = item.nodeValue?.replace(filterText, '')
            if (!item.nodeValue || ['d', 'D', '牛', '，'].includes(item.nodeValue)) {
              count++
              dom.closest('.ul')?.remove()
            }
          }
        })
      })
      return count
    }
    count = removeComment()
    const strList = ['.nav2-ul','.article-list.top','.pop-hongbao-on','.tishi','.xiangguan','aside','#commentbox','footer']
    removeDomByList(strList)
    document.querySelector('.copyright')?.parentElement?.remove()
    
  } else {
    const contentDiv = document.getElementById('content');
    const articleDiv = document.querySelector('.article');

    // 确保目标元素存在
    if (articleDiv && contentDiv) {
      // 移动元素
      contentDiv.appendChild(articleDiv);
    }

    const strList = ['.grid-16-8','.sns-bar','#db-nav-group','#db-global-nav','.comment-form','#footer','#landing-bar','.txd']
    removeDomByList(strList)

    const a = document.querySelector('.topic-content') as HTMLElement
    if (a) {
      a.style.display = 'flex'
      a.style.flexDirection = 'column';
    }

    const body = document.querySelector('body')
    if (body) {
      body.style.boxSizing = 'border-box'
      body.style.width = '100vw'
    }

    const wrapper = document.getElementById('wrapper')
    if (wrapper) {
      wrapper.style.width = '100vw'
    }
    const doc = document.querySelector('.topic-doc') as HTMLElement
    if (doc) {
      doc.style.width = '100vw'
      doc.style.padding = '10px'
      doc.style.boxSizing = 'border-box'
    }

    // 移除无效评论dom
    const removeComment = () => {
      let count = 0
      document.querySelectorAll('.reply-content').forEach((item) => {
        const dom = item as HTMLElement
        const content = dom.innerText.replace(filterText, '')
        if (!content || ['d', 'D', '牛', '，'].includes(content)) {
          count++
          dom.parentElement?.parentElement?.remove()
        }
        else { dom.innerText = content }
      })
      return count
    }
    count = removeComment()
  }


  const msg = `✨ 已移除无效评论${count}条`
  app.innerHTML = `<button class="fixed bottom-2 right-2 btn btn-primary">${msg}</button>`
})()