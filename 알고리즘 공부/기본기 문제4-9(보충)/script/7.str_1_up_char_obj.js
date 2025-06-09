/**
 * 

#### 7️⃣ **문자열에서 각 문자의 등장 간격이 1 이상이면 해당 문자만 반환**

    `// 예: "abcadc" → { "a": 3, "c": 3 } function spacedChars(str) { }`
 */

    console.log(spacedChars("abcadc"));

    function spacedChars(str) { 
      let map = {};
      let result = {};

      // 각 문자의 위치 기록
      for (let i = 0; i < str.length; i++) {
         const char = str[i];
         if (!map[char]) map[char] = [];
         map[char].push(i);
      }

      // 간격 계산
      for (let key in map) {
         if (map[key].length >= 2) {
            const gap = map[key][1] - map[key][0];
            if (gap >= 1) {
               result[key] = gap;
            }
         }
      }
      return result;
    }