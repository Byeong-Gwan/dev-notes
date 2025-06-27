/**
 * 
### 9️⃣ **문자열에서 “두 번째로 많이 등장한 문자(복수 가능)”를 배열로 반환**

    > 예: `"aabbbcc"` → `['c']`  
    > (a:2, b:3, c:2 → 두 번째 많은 수는 2, a/c)

    `function secondFreqChars(str) { }`
 */

const str = "aabbbcc";
console.log(secondFreqChars(str));

function secondFreqChars(str) {
    const obj = {};
    
    // 1. 각 문 등장 횟수 
    for (const char of str) {
        obj[char] = (obj[char] || 0) + 1;
    }
    console.log('등장횟수: ', obj);

    // 2. 등장 횟수만 배열로 뽑아서 정렬
    const counts = Object.values(obj).sort((a, b) => b - a);
    console.log('정렬된 등장 횟수: ', counts);

    // 3. 중복 제거 (같은 수 제거)
    const uniqueCounts = [...new Set(counts)];
    console.log('중복 제거된 등장 횟수: ', uniqueCounts);

    // 4. 두 번째로 큰 값 착기
    if (uniqueCounts.length < 2) {
        return []; // 두 번째로 많은 값이 없으면 빈 배열 반환
    }

    const secondMax = uniqueCounts[1];
    console.log('두 번째로 많은 등장 수: ', secondMax);

    // 5. 해당 등장 수를 가진 문자들 배열로 반환
    const result = [];
    for (const key in obj) {
        if (obj[key] === secondMax) {
            result.push(key);
        }
    }

    return result;
 }