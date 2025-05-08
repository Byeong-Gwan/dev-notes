/**
 * 
 **문제 9: 사용자 입력으로 배열 만들기**

 * 사용자로부터 여러 개의 과일 이름을 입력받아 배열에 저장하고, 
    "입력 완료"라는 메시지가 출력될 때까지 입력을 받으세요. 
    입력이 끝나면, 배열에 저장된 과일 목록을 출력하세요.

 */

    let fruits = [];
    let fruit = prompt('추가하고 싶은 과일을 입력하세요.');
    

    while (fruit !== '입력완료') {
        fruits.push(fruit);


        fruit = prompt('추가하고 싶은 과일을 입력하세요.');
        
    }
    
    for (let i = 0; i <= fruits.length; i++) {
        if (fruits[i] === undefined){
            break;
        } 
        document.write(fruits[i]);
        document.write('<br>');
        
    }
