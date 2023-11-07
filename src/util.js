
// 将一个类数组对象（如arguments对象或NodeList）转换为一个真正的数组，并返回结果
export function toArray(list, start) {
  start = start || 0;
  let i = list.length - start;
  let ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }

  return ret;
}
