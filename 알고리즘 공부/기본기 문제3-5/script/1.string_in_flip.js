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
  // 문자열을 공백을 기준으로 단어로 분리
  const words = str.split(' ');
    
  // 각 단어를 뒤집고 다시 합치기
  const reversedWords = words.map(word => {
      return word.split('').reverse().join('');
  });
  
  // 뒤집은 단어들을 공백으로 다시 합치기
  return reversedWords.join(' ');
}