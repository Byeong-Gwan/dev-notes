/**
 * 
### 5️⃣ 최빈값 구하기 (배열 조작)
- [ ] 
**문제**  
숫자 배열이 주어졌을 때, 가장 많이 등장한 숫자를 반환하세요.

    - 입력: `[1, 2, 2, 3, 3, 3, 4]`
        
    - 출력: `3`
        

    📌 조건:

    - `for`, `객체로 카운팅`, `최대값 구하기`
        
 */

    console.log(arrFindMode([1, 2, 2, 3, 3, 3, 4]));

    /**
     * 일단 풀긴했지만 로직이 지저분함
     * 결과 값은 나왔지만 개선의 여지가 있음
     */
    // function arrFindMode (arr) {
    //     let obj = {}; // 객체로 전환 key: value 로 전환
    //     let objArr = []; // values 값 담을 그릇
    //     let keysObj = []; // Keys 값 담을 그릇
        
    //     // 객체에 중복 숫자 개수 세기
    //     arr.forEach((e) => {
    //         obj[e] = (obj[e] || 0) + 1;
    //     });
        
    //     objArr = Object.values(obj); // 객체의 values 값 배열로 담기
    //     keysObj = Object.keys(obj); // 객체에 keys 값 배열로 담기
    //     let max = objArr[0]; // 초기값 셋팅

    //     // 반복문을 통해서 가장 큰 값을 찾기
    //     for (let i = 0; i < objArr.length; i++) {
    //         // max보다 큰 값을 다시 할당
    //         if (max < objArr[i]){
    //             // 가장 큰 값의 index 자리에 있는 Key 값 담기
    //             max = keysObj[i];
    //         }

    //     } 
    //     return max;
    // }

    function arrFindMode (arr) {
        let obj = {};
        let maxKey = null;
        let maxCount = 0;

        for (let i = 0; i < arr.length; i++) {
            const num = arr[i];
            obj[num] = (obj[num] || 0) + 1;

            if (obj[num] > maxCount) {
                maxCount = obj[num];
                maxKey = num;
            }
        }

        return Number(maxKey);
    }