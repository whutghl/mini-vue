
const onRE = /^v-on:|^@/;
const modelRE = /^v-model/;
const textRE = /^v-text/;
const dirAttrRE = /^v-([^:]+)(?:$|:(.*)$)/

/**
 *
 ^v-            匹配以 v- 开头的字符串。
 ([^:]+)        使用括号捕获的分组，匹配除冒号 : 之外的任意字符，且至少匹配一个字符。
 (?:$|:(.*)$)   使用非捕获分组 (?:)，表示匹配但不捕获结果。该部分包含两个子部分：
 $|             匹配行尾位置，表示字符串结束。
 :(.*)$         匹配冒号 : 后面的任意字符，并捕获结果。.* 表示匹配任意数量的字符（除了换行符），$ 表示行尾位置。
 因此，这个正则表达式可以用于提取形如 v-xxx 或 v-xxx:yyy 的字符串中的 xxx 和 yyy 部分。

 以下是一些示例：

 const regex = /^v-([^:]+)(?:$|:(.*)$)/;

 const match1 = regex.exec('v-abc');
 console.log(match1[1]); // 输出: abc
 console.log(match1[2]); // 输出: undefined

 const match2 = regex.exec('v-xyz:123');
 console.log(match2[1]); // 输出: xyz
 console.log(match2[2]); // 输出: 123
 */


 export const compileDirectives = function (el, attrs){

    if(!attrs) {
        return undefined;
    }
    const dirs = [];

    let i = attrs.length;

    while(i--){
        const attr = attrs[i];
        const name = attr.name;
        const value = attr.value;

    }

 }