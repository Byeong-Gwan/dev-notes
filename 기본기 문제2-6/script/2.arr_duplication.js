/**
 * 
### **2️⃣ 배열 요소 중복 제거 (중급)**

    > 주어진 배열에서 **중복된 요소를 제거**하고 새로운 배열을 출력하세요.
    > 
    > - 입력: `[1, 3, 3, 5, 1, 7, 9, 3]`
    >     
    > - 출력: `[1, 3, 5, 7, 9]`
    >     

    #### ✅ **조건**

    - `indexOf()`를 사용하여 해결할 것 (`Set` 사용 금지)
        
    - `for`문을 활용하여 중복 제거 구현
        

 */

    const inputArr = [1, 3, 3, 5, 1, 7, 9, 3];
    // let outputArr = inputArr.filter((e, idx) => {
    //     return inputArr.indexOf(e) === idx;
    // });

    // console.log('중복 제거 값: ', outputArr);

    let arr = [];

    for (let i = 0; i< inputArr.length; i++) {
        if (arr.indexOf(inputArr[i]) === -1) {
            arr.push(inputArr[i]);
        }
    }

    console.log('weew', arr);