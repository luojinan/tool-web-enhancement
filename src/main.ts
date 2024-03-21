import './style.css';

(() => {
  console.log('nothing to do', location.host)
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

    document.querySelector('.nav2-ul')?.remove()
    document.querySelector('.article-list.top')?.remove()
    document.querySelector('.pop-hongbao-on')?.remove()
    document.querySelector('.tishi')?.remove()
    document.querySelector('.copyright')?.parentElement?.remove()
    document.querySelector('.xiangguan')?.remove()
    document.querySelector('aside')?.remove()
    document.querySelector('#commentbox')?.remove()
    document.querySelector('footer')?.remove()

  } else {
    const contentDiv = document.getElementById('content');
    const articleDiv = document.querySelector('.article');

    // 确保目标元素存在
    if (articleDiv && contentDiv) {
      // 移动元素
      contentDiv.appendChild(articleDiv);
    }

    const removeAside = () => {
      document.querySelector('.grid-16-8')?.remove()
      document.querySelector('.sns-bar')?.remove()
      document.querySelector('#db-nav-group')?.remove()
      document.querySelector('#db-global-nav')?.remove()
      document.querySelector('.comment-form')?.remove()
      document.querySelector('#footer')?.remove()
      document.querySelector('#landing-bar')?.remove()
      document.querySelector('.txd')?.remove()
    }
    removeAside()


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
  const app = document.createElement('div');
  app.innerHTML = `
<div class="web-plugin-float">
    <p>${msg}</p>
  </div>`
  document.body.append(app);
})()