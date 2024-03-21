import { doubanRun } from './douban';
import './style.css';
import { xianbaoRun } from './xianbao';

(() => {
  console.log('nothing to do', location.host)
  // 脚本执行实际在页面后，因此loading没有意义，脚本执行的多快取决于原页面加载，如果原页面加载久就会看到原页面久，然后闪到新样式
  const app = document.createElement('div');

  app.innerHTML = `<div class="fixed top-0 left-0 right-0 bottom-0 bg-black text-white">
  <div class="animate-bounce duration-1000 my-10 text-center">loading...</div>
</div>`
  document.body.append(app);

  let count = 0
  if (location.host === 'new.xianbao.fun') {
    count = xianbaoRun()
  } else {
    count = doubanRun()
  }

  const msg = `✨ 已移除无效评论${count}条`
  app.innerHTML = `<button class="fixed bottom-8 right-2 btn btn-primary">${msg}</button>`
})()