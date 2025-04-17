/**
 * ### 🧩 5️⃣ 구구단 출력기

    * 숫자 n이 주어지면 해당 숫자의 구구단(1~9)을 문자열로 출력하세요.  
    * 🔹 입력: 3  
    * 🔹 출력: "3 x 1 = 3\n3 x 2 = 6\n...3 x 9 = 27" 
 */



function mulit (num) {
    num = Number(num);
    if (isNaN(num)){
        return '숫자를 입력해주세요.';
    }

    let result;

    for (let i = 0; i < 10; i++) {
        
        result = `${num} * ${i} = ${num * i}\n`;
    }
    return result.trim(); // 마지막 줄바꿈 제거
}

const inputNum = prompt('구구단 중 알고 싶은 단을 입력하세요.', '');
console.log(mulit(inputNum));