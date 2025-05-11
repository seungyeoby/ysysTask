let result = 0;

for (let i = 0; i<=100; i++ ){
 if (i%2 === 0) {
  result += i;
 }else if (i%5 === 0) {
  result += i;
 }
}

console.log(result);