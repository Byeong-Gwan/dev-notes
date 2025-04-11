/**
 * 
### 🧩 1️⃣ 문자열 내 단어 뒤집기

* 주어진 문자열에서 각 단어를 뒤집어서 반환하세요.  
    * 📌 조건: 전체 문자열을 뒤집는 게 아니라 각 단어만!  
    * * 🔹 입력: "hello world"  
    * * 🔹 출력: "olleh dlrow" 

 */

const str = "hello world";
console.log(strFlip(str));

function strFlip (str) {
    const arr = str.split(' ');
    console.log('arr: ', arr);
    let arr2 = []
    let flipStr = '';
    for (let i = 0; i < arr.length; i++) {
        arr2.push(arr[i].split(''));
        console.log('333',arr2)
        for (let j = 0; j < arr2.length; j++) {
            flipStr += arr2[j].reverse();
        }
        flipStr += ' ';
    }
    console.log('arr2: ', arr2[0]);
    console.log('flipStr: ', flipStr);
    
}