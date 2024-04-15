import { doubanRun } from './douban';
import './style.css'; // 使用tailwindcss导致污染全局样式，去掉就用不了daiyui
import { xianbaoRun } from './xianbao';

(() => {
  console.log('nothing to do', location.host)
  // 创建一个 shadow root
  const app = document.createElement('div').attachShadow({ mode: 'open' });

  if (location.host === 'm.weibo.cn') {
    if(location.pathname === '/search'){
      return
    }
    const button = document.createElement('div');
    button.innerHTML = `<div class="drawer">
      <input id="my-drawer" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content">
        <label for="my-drawer" class="fixed bottom-8 right-2 btn btn-primary drawer-button">🔥</label>
      </div> 
      <div class="drawer-side">
        <label for="my-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
        <div class="menu p-2 pt-24 w-80 min-h-full bg-base-200 text-base-content">
          <div class="loading">loading...</div>
        </div>
      </div>
    `

    // 将按钮添加到 shadow root 中
    app.appendChild(button);

    document.body.append(app); // 处理完shadowdom才能append
    document.querySelector('.drawer-button')?.addEventListener('click', () => {
      // TODO: cache
      // const error = document.querySelector('.error') && (document.querySelector('.error')?.className = 'loading')
      fetch('https://tenapi.cn/v2/weibohot').then(resp => resp.json()).then(res => {
        // const newElement = document.createElement('div');
        let test = ''
        if (res.code === 200) {
          test = res.data.reduce((resHtml: string, next: { name: string, hot: string, url: string }) => {
            if (/剧集|综艺|电影/.test(next.hot) || /肖战/.test(next.name)) {
              return resHtml
            }
            return `${resHtml}<p class="py-2"><a class="link" href="${next.url}">${next.name} - ${next.hot}</a></p>`
          }, '')
        } else {
          test = '<p class="error">数据获取失败</p>'
        }

        const menuDom = document.querySelector('.menu')
        if(menuDom){
          menuDom!.innerHTML = test
        }
      })
    })
    return
  }

  let count = 0
  if (location.host === 'new.xianbao.fun') {
    count = xianbaoRun()
  } else {
    count = doubanRun()
  }
  // 微博提供pure热搜悬浮按钮 fetch('https://tenapi.cn/v2/weibohot').then(res=>res.json()).then(res1=>console.log(res1))

  const msg = `✨ 已移除无效评论${count}条`
  app.innerHTML = `<button class="fixed bottom-8 right-2 btn btn-primary">${msg}</button>`
  document.body.append(app); // 处理完shadowdom才能append
})()