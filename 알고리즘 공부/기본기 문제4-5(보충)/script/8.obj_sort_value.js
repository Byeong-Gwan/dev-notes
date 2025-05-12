/**
 * 
### **8️⃣ 객체를 값 기준으로 정렬하기**

> 🔹 _개념_: 객체 정렬 + 키/값 추출  
> 🔹 _난이도_: ★★★★☆

**문제**  
객체의 값들을 기준으로 **내림차순 정렬된 키 목록**을 배열로 반환하세요.

    `const data = { a: 2, b: 5, c: 1, d: 4 };`

    - 출력: `['b', 'd', 'a', 'c']`
        
 */

    const data = { a: 2, b: 5, c: 1, d: 4 };
    console.log(objSortValue(data));

    function objSortValue (data) {
        // Object.keys(data)를 사용해서 객체의 키들을 배열로 추출
        const result = Object.keys(data);
        // sort()메서드를 사용해서 키 배열을 정렬(내림차순)
        const sortedArr = result.sort((a, b) => data[b] - data[a]);
        // 정렬된 키 배열을 반환
        return sortedArr;
    }