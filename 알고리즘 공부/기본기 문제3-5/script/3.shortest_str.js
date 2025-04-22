/**
 * ### 🧩 3️⃣ 가장 짧은 단어 찾기

    * 문자열이 주어졌을 때 가장 짧은 단어를 반환하세요.  
    * 🔹 입력: "I love frontend development"  
    * 🔹 출력: "I"
 */

const str = "I love frontend development";
console.log(shortestStr(str));

function shortestStr(str) {
    const arr = str.split(' ');
    let shortStr = arr[0];

    arr.forEach((e) => {
        if (e.length < shortStr.length) {
            shortStr = e;
        }
    });
    
    // for (let i = 0; i < arr.length; i++) {
    //     if (shortStr.length >= arr[i].length) {
    //         shortStr = arr[i];
    //     }
    // }
    return shortStr;
}