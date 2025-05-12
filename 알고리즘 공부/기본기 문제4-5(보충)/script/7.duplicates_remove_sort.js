/**
 * 
### **7️⃣ 중복 제거 후 내림차순 정렬**

> 🔹 _개념_: 중복 제거 + 정렬  
> 🔹 _난이도_: ★★★☆☆

**문제**  
숫자 배열에서 **중복을 제거하고 내림차순으로 정렬**된 배열을 반환하세요.

    `const arr = [4, 1, 2, 2, 3, 4, 5];`

    - 출력: `[5, 4, 3, 2, 1]`
        
 */

    const arr = [4, 1, 2, 2, 3, 4, 5];
    console.log(duplicatesRemoveSort(arr));

    function duplicatesRemoveSort (arr) {
        let result = [];

        for (let i = 0; i < arr.length; i++) {
            if (result.indexOf(arr[i]) === -1) {
                result.push(arr[i]);
            }
        }

        result.sort((a, b) => b - a);

        return result;
    }