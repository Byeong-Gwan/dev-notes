/**
 * 
 **🔥 6. `map()`과 `forEach()`의 차이점 테스트**

 * 배열 `[1, 2, 3, 4, 5]`에서  
    1️⃣ `map()`을 사용하여 각 요소에 2를 곱한 새로운 배열을 생성  
    2️⃣ `forEach()`를 사용하여 각 요소에 2를 곱한 값을 출력

    💡 `map()`은 새로운 배열을 반환하지만, `forEach()`는 반환하지 않는 차이를 이해하는 것이 핵심!
 */

    let arr = [1, 2, 3, 4, 5];
    let arrCopy = [];

    arr.forEach((element) => {
        arrCopy.push(element * 2);
    });

    document.write('forEach: ', arrCopy);

    // map 함수는 return 값이 없으면 undefined를 반환한다. 
    // return 값 없이 로직을 구성하려면     
    // const map3 = map2.map(x => x*2);
    // console.log('map3:: ', map3);
    // 이렇게 처리한다.
    const map2 = arr.map((element) => {return element * 2});
    document.write('<br>map: ', map2);
