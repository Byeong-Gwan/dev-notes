/**
 * 
### ✅ 🧩 **3️⃣ 단어 길이 기준 정렬하기**

문자열 배열이 주어졌을 때, **단어 길이 기준으로 오름차순 정렬된 배열을 반환**하세요.

    - 🔹 입력: `["banana", "fig", "apple", "date"]`
        
    - 🔹 출력: `["fig", "date", "apple", "banana"]`
        

    📌 조건:

    - `sort()`, `length` 사용
        
 */

    console.log(sortWordLength(["banana", "fig", "apple", "date"]));

    // function sortWordLength (arr){

    //     arr.sort((a, b) => { // 	배열 내 요소 두 개
    //         // a, b의 length를 비교 정렬, 순서 결정하는 기준 값 (1 = 교체, -1 = 유지)
    //         if (a.length > b.length) {return 1;} // a는 뒤로, b는 앞으로
    //         if (a.length < b.length) {return -1;} // a는 앞으로, b는 뒤로
    //     });

    //     return arr;
    // }

    // 최적화 리팩토링
    function sortWordLength (arr){
        return arr.sort((a, b) => a.length - b.length);
    }