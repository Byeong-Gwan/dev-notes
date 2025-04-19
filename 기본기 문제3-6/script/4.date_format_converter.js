/**
 * ### 🧩 **4️⃣ 날짜 형식 변환기**

    > "2025-04-17" 형식을 `"2025년 4월 17일"`로 변환하세요.

    - 🔹 입력: `"2025-04-17"`
        
    - 🔹 출력: `"2025년 4월 17일"`
        

    📌 `split()` 사용 가능  
    `padStart()` 없이 숫자 앞 0은 제거

 */

    console.log(dateFormat('2025-04-17'));

    
    function dateFormat (data) {
        let dateArr = data.split('-');

        for (let i =0; i < dateArr.length; i++) {
            if (/^0/.test(dateArr[i])) {
                dateArr[i] = dateArr[i].slice(1);
            }
        }
        return `${dateArr[0]}년 ${dateArr[1]}월 ${dateArr[2]}일`;
    }
