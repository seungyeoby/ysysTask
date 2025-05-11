let fruits =  ["사과", "딸기", "파인애플", "수박", "참외", "오렌지", "자두", "망고"];
let fruits2 = ["수박", "사과", "참외", "오렌지", "파인애플", "망고"];

const same = new Array;
const diff = new Array;

for(let i of  fruits) {
  if(fruits2.includes(i)) {
    same.push(i)
  }else {
    diff.push(i)
  }

}



console.log(same);
console.log(diff);