/**
 * 根据提供的元素选择器列表，移除文档中的对应DOM元素。
 * @param list 包含元素选择器字符串的数组，如['.class', '#id']。
 */
export function removeDomByList(list: string[]) {
  // 遍历提供的选择器列表，并尝试移除每个匹配的元素
  list.forEach((item) => {
    document.querySelectorAll(item)?.forEach(item=>item.remove())
  });
};

// 使用ts实现复制到粘贴板功能
export function copyToClipboard(text: string) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
}

export function runToast(text: string) {
  const toastDom = document.querySelector('#my-toast') as HTMLElement
  if (toastDom) {
    toastDom.style.display = 'block';
    const toastMsgDom =  document.querySelector('#my-toast .alert span') as HTMLElement
    toastMsgDom.innerText = text

    setTimeout(() => {
      toastDom.style.display = 'none';
    }, 3000);
  }
}