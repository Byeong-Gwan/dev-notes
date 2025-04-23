/**
 * 
 * ### ✅ 5️⃣ 연속된 숫자 합 (난이도↑)

    > 1부터 `n`까지의 숫자 중 연속된 **짝수 2개**의 합만 누적하세요.  
    > (예: 2+4, 4+6, 6+8 …)

    - 입력: `10`
        
    - 출력: `2+4=6`, `4+6=10`, `6+8=14`, `8+10=18` → 총합: `6+10+14+18 = 48`
        
    `function evenPairsSum(n) {   // 구현 } console.log(evenPairsSum(10)); // 48`
 */

    function evenPairsSum(n) {
        let arr = [];
        let sum = 0;

        for (let i = 1; i < n - 2; i++){
            let pairSum = i + (i + 2);
            arr.push(pairSum);
        }

        for (let i = 0; i < arr.length; i++) {
            sum += arr[i];
        }

        return sum;
    } 
    
    console.log(evenPairsSum(10)); // 48