let age = prompt("나이를 입력해 주세요 ex) 20");
age = Number(age)

if(age >= 20) {
  console.log("성인 입니다.")
}else if ( age >= 17 ) {
  console.log("고등학생 입니다.")
}else if ( age >= 14) {
  console.log("중학생 입니다.")
}else if ( age >= 8) {
  console.log("초등학생 입니다.")
}else if(age >= 0) {
  console.log("유아 입니다.")
}else {
  console.log("양수를 입력해 주세요 ")
}