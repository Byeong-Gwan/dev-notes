/**
 * 
### **5. 로또 번호 생성기**
    > **1~45 사이의 숫자 6개를 중복 없이 랜덤**으로 뽑아 출력하세요.

    - 출력 예: `[7, 12, 23, 31, 35, 41]`

    ### 조건

    - 중복 체크 로직 직접 작성 (Set 사용 X)
    - 배열 정렬은 선택
 */

    let arr = [];

    for (let i =0; i < 6; i++) {
        let num = Math.floor(Math.random() * 45 + 1);

        if (arr.indexOf(num) === -1) {
            arr.push(num)
        } else {
            i--;
        }
    }
    arr.sort((a, b) => {
        return a - b;
    })
document.writeln('lotto Num: ', arr.join(', '));
    