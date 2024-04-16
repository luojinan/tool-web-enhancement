import { doubanRun } from './douban';
import './style.css'; // 使用tailwindcss导致污染全局样式，去掉就用不了daiyui
import { xianbaoRun } from './xianbao';

(() => {
  console.log('nothing to do', location.host)
  // 创建一个 shadow root
  const app = document.createElement('div').attachShadow({ mode: 'open' });

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

  const toast = document.createElement('div').attachShadow({ mode: 'open' });
  toast.innerHTML = `<div id="my-toast" style="display:none" class="toast toast-top toast-center">
  <div class="alert alert-success">
    <span>New message arrived.</span>
  </div>`
  document.body.append(toast); // 处理完shadowdom才能append
  
})()