/**
 * 
### **3️⃣ 가장 많이 등장한 문자 찾기 (중급)**

    > 주어진 문자열에서 가장 많이 등장한 문자를 찾아 출력하세요.
    > 
    > - 입력: `"banana"`
    >     
    > - 출력: `"가장 많이 등장한 문자: a (3번)"`
    >     

    #### ✅ **조건**

    - `for`문과 객체(`{}`)를 활용할 것
        
    - `prompt()`로 입력받기
        
    - 대소문자 구분 없이 처리하기 (ex: `"Apple"`, `"apple"` → `'p'`가 2번 등장)
        
 */

    // ** 시행착오 로직 
    // let inputStr = prompt('문자를 입력하세요.', '');
    // let obj = {};
    // let arr = [];

    // for (let i = 0; i < inputStr.length; i++) {
    //     let char = inputStr.charAt(i);
    //     if (obj[char]) {
    //         obj[char]++;
    //     } else {
    //         obj[char] = 1;
    //     }
    // }

    // console.log('obj: ', obj);
    // let keys = Object.values(obj);
    // let key = Object.keys(obj);
    // console.log('keys: ', keys);
    // for (let i = 0; i < str.length; i++) {
    //     let char = str.charAt(i);
    //     if (obj[char]) {
    //         obj[char]++;
    //     } else {
    //         obj[char] = 1;
    //     }
        
    // }

    // function solution(arr) {
    //     return [Math.max(...arr)];
    // }
    // let y = solution(keys);
    // console.log('223133: ', y)

    // for (y in obj) {
    //     console.log('eee',`${key}`);
    // }
    // let k = Object.values(obj) === solution(keys) ? Object.keys(obj) : -1;
    // console.log('aaa', solution(keys));
    // console.log('aaa:: ', k);

    // console.log(' Object.values(obj):: ',  Object.values(obj));
    /**
     * 사고능력 부족 
     * 계속 비슷한 문제 익히면서 스스로 짤 수 있게 사고능력 올리기 필요
     */

    // 대소문자 구분 없이 처리
    let inputStr = prompt('문자를 입력하세요.', '').toLowerCase(); 
    let obj = {};
    let maxChar = ''; // 가장 많이 등장한 문자
    let maxCount = 0; // 최대 등장 횟수

    // 문자 개수 세기
    for (let i =0; i < inputStr.length; i++) {
        let char = inputStr[i]; // charAt(i) 대신 배열처럼 접근 가능
        obj[char] = (obj[char] || 0) + 1; // 존재하면 + 1, 없으면 1로 초기화

        // 최대 등장 문자 찾기
        if (obj[char] > maxCount) {
            maxCount = obj[char];
            maxChar = char;
        }
    }

    // 결과 출력
    console.log('가장 많이 등장한 문자: ', `${maxChar} (${maxCount}번)`);