/**
 * 根据提供的元素选择器列表，移除文档中的对应DOM元素。
 * @param list 包含元素选择器字符串的数组，如['.class', '#id']。
 */
export function removeDomByList(list: string[]) {
  // 遍历提供的选择器列表，并尝试移除每个匹配的元素
  list.forEach((item) => {
    document.querySelector(item)?.remove();
  });
};