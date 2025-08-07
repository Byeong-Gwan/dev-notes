/**
 * 
#### 9️⃣ **재귀로 팩토리얼 구하기**

    `// 입력: 5 // 출력: 120`
    팩토리얼은 1부터 입력된 숫자까지의 모든 정수를 곱한 값
 */

    const num = 5;
    console.log(factorial(num));

    function factorial (num) {
        if (num === 0) {
            return 1;
        } else {
            return num * factorial (num - 1);
        }
    }