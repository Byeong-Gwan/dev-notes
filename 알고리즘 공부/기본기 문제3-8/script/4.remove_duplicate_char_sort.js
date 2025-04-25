/**
 * 
### 🧠 🧩 **4️⃣ 중복 문자 제거 + 정렬 (난이도↑)**

    **문제**  
    문자열에서 중복된 문자를 제거하고, **오름차순 정렬**된 문자열을 반환하세요.

    - 🔹 입력: `"cbacbacba"`
        
    - 🔹 출력: `"abc"`
        

    📌 조건: `Set()` 금지, `for`, `indexOf`, `sort` 등 직접 구현

 */

    console.log(removeDuplicateChar('cbacbacba'));

    function removeDuplicateChar(str){
        const arr = str.split('');
        let obj = {};

        arr.forEach((e) => {obj[e] = (obj[e] || 0) + 1});
        return Object.keys(obj).sort().join('');
    }
