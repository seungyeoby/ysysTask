for (let i=1; i<=10000; i++){
  if (i % 13 === 0) {
    if(i % 2 === 1 ) {
      console.log(i)
    }
  }
}

let input = prompt("숫자를 입력해주세요");
input = Number(input);

for (let i=1; i<=input; i++){
  if (i % 13 === 0) {
    if(i % 2 === 1 ) {
      console.log(i)
    }
  }
}

