/**
 * 
 * ### **2-2. 특정 패턴의 첫 번째 위치 찾기**

> 🔹 _개념_: 패턴 매칭 + 인덱스 반환  
> 🔹 _난이도_: ★★★☆☆

    **문제:**  
    문자열에서 `"abc"`라는 패턴이 처음으로 등장하는 인덱스를 반환하세요.  
    (패턴이 없으면 `-1` 반환)

    ```javascript
    const str = "abababc"; 
    console.log(findPatternIndex(str, "abc")); // 4  

    function findPatternIndex(str, pattern) {   // 여기에 패턴 매칭 로직 작성 
    ...
    }
    ```
 */

    const str = "abababc"; 
    console.log(findPatternIndex(str, "abc")); // 4  

    function findPatternIndex(str, pattern) {   // 여기에 패턴 매칭 로직 작성 

        for (let i = 0; i <= str.length - pattern.length; i++) {
            if (str.substring(i, i + pattern.length) === pattern) {
                return i
            } 
        }
        return -1;
    }