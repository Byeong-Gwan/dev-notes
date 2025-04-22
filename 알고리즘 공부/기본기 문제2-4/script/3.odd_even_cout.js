/**
 * 
## 3. **홀짝 카운터**

> 숫자 배열에서 **홀수와 짝수의 개수**를 각각 출력하세요.

- 입력: `[1, 2, 3, 4, 5, 6]`
- 출력: `홀수: 3개, 짝수: 3개`

### 조건

- `for`, `if` 사용
- 숫자 외 요소 있을 경우 **무시 처리** (예외처리)
 */

    const oddEven = [1, 2, 3, 4, 5, 6];
    let oddCount = 0;
    let evenCount = 0;

    for (let i =0; i < oddEven.length; i++) {
        const current = oddEven[i];
        
        if (isNaN(current) || typeof current !== 'number'){
            alert('숫자만 입력할 수 있습니다.');
            continue;
        }

        if (oddEven[i] % 2 === 0) {
            evenCount++;
        } else {
            oddCount++;
        }
    }

    document.writeln('홀수: ', oddCount);
    document.writeln('<br>짝수: ', evenCount);