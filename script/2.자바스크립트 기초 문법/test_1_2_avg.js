let quarter = prompt("평균을 입력하세요", '');
let quarter1 = 1200;
let quarter2 = 1300;
let quarter3 = 1000;

let arg = (quarter1 + quarter2 + quarter3) / 3;
console.log('arg::',arg);

let resultQuarter = quarter > arg ? '\n평균 이상' : "\n평균 이하";
document.write(resultQuarter);