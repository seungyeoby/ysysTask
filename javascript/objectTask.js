let today = new Date();
let day = today.getDay();


switch(day) {
  case 0 : {
    console.log("일요일(주말)입니다.")
    break;
  }
  case 1 : {
    console.log("월요일(평일)입니다.")
    break;
  }
  case 2 : {
    console.log("화요일(평일)입니다.")
    break;
  }
  case 3 : {
    console.log("수요일(평일)입니다.")
    break;
  }
  case 4 : {
    console.log("목요일(평일)입니다.")
    break;
  }
  case 5 : {
    console.log("금요일(평일)입니다.")
    break;
  }
    case 6 : {
    console.log("토요일(주말)입니다.")
    break;
  }

}


