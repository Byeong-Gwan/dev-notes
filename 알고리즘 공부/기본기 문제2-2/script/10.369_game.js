/**
 * 
#### **10. 369 게임 (업그레이드 버전)**
    💡 1부터 사용자가 입력한 숫자까지 출력하는데, **3, 6, 9가 포함된 숫자는 "짝"으로 출력**하는 프로그램을 작성하세요.

    입력: 15 출력: 1, 2, 짝, 4, 5, 짝, 7, 8, 짝, 10, 11, 12, 짝, 14, 15

    📌 문자열 변환 후 반복문으로 처리하는 방식이 효율적일 수 있음!
 */

    let inputNum = prompt('숫자를 입력하세요.', '');
    inputNum = Number(inputNum);

    if (!isNaN(inputNum)) {
        let arr = [];
        let numString = []; 
        let a = /[3]|[6]|[9]/;
        
        for (let i = 0; i < inputNum; i++) {

            arr.push(i + 1)
            numString.push(arr[i].toString());

            let num369Game = numString[i] === '3' || numString[i] === '6' || numString[i] === '9'
            
            if (num369Game || a.test(numString[i])) {
                numString[i] = '짝'
            }
            document.writeln(numString[i]  + ', ');
        }
    } else {
        alert('숫자만 입력해야됩니다.')
    }