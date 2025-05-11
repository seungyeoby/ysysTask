const numbers = new Array;

console.log(numbers)
for (let i = 1; i<=100; i++) {
  numbers.push(i);
}

console.log(numbers);

let sum1 = 0;
for(let i = 0; i< numbers.length; i++) {
  sum1 += numbers[i];
}

let sum2 = 0;
for(let i of numbers) {
  sum2 += i;
}

let sum3 = 0;
numbers.forEach((e) => {
  sum3 += e;
})

console.log(sum1, sum2, sum3);