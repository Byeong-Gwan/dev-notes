/**
 * 
 **🔥 8. 1부터 100 사이의 랜덤 숫자 맞추기**

 * 컴퓨터가 1~100 사이에서 랜덤 숫자를 선택하면, 사용자가 입력한 숫자와 비교하여  
    **"더 높아요!"**, **"더 낮아요!"**, **"정답!"** 메시지를 출력하는 게임을 만드세요.
 */

    let num = prompt('숫자를 입력해주세요.');
    let random = Math.floor(Math.random() * 100);
    num = Number(num);
    console.log('random:: ',random);

    if(!isNaN(num)){
        if(random > num) {
            alert('더 높아요!');
        } else if(random < num) {
            alert('더 낮아요!');
        } else if (random === num) {
            alert('정답입니다!');
        }
    }
    