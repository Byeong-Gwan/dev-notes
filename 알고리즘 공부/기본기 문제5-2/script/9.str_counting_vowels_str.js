/**
 * 
### **9️⃣ 문자열에서 모음 개수 세기 (조금 생각)**

    문자열에서 모음 (a, e, i, o, u)

    `// 입력: "hello world" → 출력: 3`

    `function countVowels(str) { }`

 */

    const str = "hello world";
    console.log(countVowels(str));

    function countVowels(str) {
        const lowerCaseStr = str.toLowerCase();
        const vowels = "aeiou";

        let vowelCount = 0;
        
        for (const char of lowerCaseStr) {
            if (vowels.includes(char)) {
                vowelCount++;
            }
        }
        return vowelCount;
    }