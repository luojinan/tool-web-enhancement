import './style.css';

(() => {
  console.log('nothing to do')
  // 获取目标元素
  const articleDiv = document.querySelector('.article');
  const contentDiv = document.getElementById('content');

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
  }

  // 移除无效评论dom
  const removeComment = () => {
    let count = 0
    document.querySelectorAll('.reply-content').forEach((item) => {
      const filterText = /(d{2,})|谢谢姐妹|滴滴|谢谢|!|！|\s/gi // 过滤2个以上的d和谢谢
      const content = item.innerText.replace(filterText, '')
      if (!content || ['d', 'D', '牛', '，'].includes(content)) {
        count++
        item.parentElement?.parentElement?.remove()
      }
      else { item.innerText = content }
    })
    return count
  }
  let count = removeComment()
  const msg = `✨ 已移除无效评论${count}条`


  const app = document.createElement('div');
  app.innerHTML = `
<div class="web-plugin-float">
    <p>${msg}</p>
  </div>`
  document.body.append(app);
})()