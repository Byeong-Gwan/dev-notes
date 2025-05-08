/**
 * 
 * ### **1️⃣ 문자열 뒤집기 (기본)**

    > 주어진 문자열을 **뒤집어서** 출력하는 프로그램을 작성하세요.
    > 
    > - 입력: `"hello"`
    >     
    > - 출력: `"olleh"`
    >     

    #### ✅ **조건**

    - `for`문을 사용하여 직접 뒤집을 것 (`reverse()` 금지)
        
    - `prompt()`로 입력받기
        
 */

    // let inputPromp = prompt('문자를 입력하세요.', '');
    // let arr = [];
    // let str;
    // str = inputPromp;

    // if (inputPromp === '') {
    //     alert('빈 값입니다. 다시 입멱해주세요.');
    //     window.location.reload();
    // }

    // for (let i = inputPromp.length - 1; i >= 0; i--) {
    //     arr.push(inputPromp.charAt(i));
    // }
    // str = arr.join('')

    // console.log('aee', arr);
    // console.log('aee', str);

    function reverseString() {
        let inputPromp = prompt('문자를 입력해주세요.', '');

        // 빈 값 또는 취소 버튼을 누른 경우 처리
        if (!inputPromp) {
            alert('빈 값입니다. 다시 입력해주세요.');
            return reverseString(); // 새로고침 대신 재귀 호출
        }

        let arr = [];

        // 문자열 뒤집기 (for문 사용)
        for (let i = inputPromp.length - 1; i >= 0; i--) {
            arr.push(inputPromp.charAt(i));
        }

        console.log('뒤집은 문자열: ', arr.join(''));
    }

    reverseString();