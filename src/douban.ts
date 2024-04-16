import { filterCommentText } from "./const";
import { removeDomByList } from "./utils";

const removeAd = () => {
  const contentDiv = document.getElementById('content');
  const articleDiv = document.querySelector('.article');

  // 确保目标元素存在
  if (articleDiv && contentDiv) {
    // 移动元素
    contentDiv.appendChild(articleDiv);
  }

  const strList = ['.grid-16-8', '.sns-bar', '#db-nav-group', '#db-global-nav', '.comment-form', '#footer', '#landing-bar', '.txd']
  removeDomByList(strList)
}

const fixPhone = () => {
  const body = document.querySelector('body')
  if (body) {
    body.style.boxSizing = 'border-box'
    body.style.width = '100vw'
    body.style.padding = '10px 10px 0 10px'
  }

  const a = document.querySelector('.topic-content') as HTMLElement
  if (a) {
    a.style.display = 'flex'
    a.style.flexDirection = 'column';
  }

  const wrapper = document.getElementById('wrapper')
  if (wrapper) {
    wrapper.style.width = '100%'
  }
  const doc = document.querySelector('.topic-doc') as HTMLElement
  if (doc) {
    doc.style.width = '100%'
    doc.style.padding = '10px'
    doc.style.boxSizing = 'border-box'
  }
}

// 移除无效评论dom
const removeComment = () => {
  let count = 0
  document.querySelectorAll('.reply-content').forEach((item) => {
    const dom = item as HTMLElement
    const content = dom.innerText.replace(filterCommentText, '')
    if (!content || ['d', 'D', '牛', '，', ','].includes(content)) {
      count++
      dom.parentElement?.parentElement?.remove()
    }
    else { dom.innerText = content }
  })
  return count
}

export const doubanRun = (): number => {
  // window.addEventListener('message', function(event) {
  //   if (event.origin === 'http://new.xianbao.fun') {
  //     const data = event.data.data;
  //     // 处理传递的数据
  //     alert(JSON.stringify(data))
  //     console.log('postmessage数据',event,data);
  //   }
  // })
  const searchParams = new URLSearchParams(window.location.search);
  const qaData = searchParams.get('qa');
  if (qaData) {
    const qaList = JSON.parse(qaData)
    setTimeout(() => {
      document.querySelectorAll('.question-content').forEach((item,index) => {
        if(qaList[index]) {
          item.innerHTML = qaList[index].answer
        }
      })
    }, 600);
  }
  
  fixPhone()
  removeAd()
  const count = removeComment()

  setTimeout(() => {
    const openAppDiv = document.createElement('div').attachShadow({ mode: 'open' });

    openAppDiv.innerHTML = `<a target="_blank" href="https://www.douban.com/doubanapp/dispatch?uri=${encodeURIComponent(location.pathname)}"><button class="fixed bottom-24 right-2 btn btn-success">打开豆瓣App</button></a>`
    document.body.append(openAppDiv); // 处理完shadowdom才能append
  }, 600);

  return count
}