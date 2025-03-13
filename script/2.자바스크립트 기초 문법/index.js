let p1 = prompt("식비","");
let p2 = 6000;
let p3 = 3000;
let sum = Number(p1) + p2 + p3;

sum = sum > 10000 ? sum - 10000 + "원 초과" : "돈 관리 굿!!";
document.write(sum);
