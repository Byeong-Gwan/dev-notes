/**
 * 
 **2. 객체 배열에서 특정 값 찾기**

 * 💡 아래와 같은 학생 정보 배열이 주어졌을 때, 사용자가 입력한 **이름과 일치하는 학생의 점수**를 출력하는 코드를 작성하세요.

    - `prompt()`를 활용하여 이름을 입력받고, 해당 학생의 점수를 출력하세요.
    - 입력한 이름이 없으면 `"해당 학생을 찾을 수 없습니다."`를 출력하세요.

    js

    복사편집

    `var students = [   { name: "철수", score: 85 },   { name: "영희", score: 92 },   { name: "민수", score: 78 },   { name: "지혜", score: 90 } ];`

 */

    // 객체 배열 데이터
    const students = [   { name: "철수", score: 85 },   { name: "영희", score: 92 },   { name: "민수", score: 78 },   { name: "지혜", score: 90 } ];
    // TODO: 1. 입력받을 데이터
    let inputName = prompt('이름을 입력해주세요.', '');
    // 입력받은 데이터 담을 그릇
    let result;

    // 숫자를 입력했을 경우 
    if (!isNaN(inputName)) {
        document.write('문자를 입력해주세요.');
    } 

    // 객체 배열을 반복해서 입력된 데이터와 동일한 값 확인 
    for (let i = 0; i < students.length; i++) {
        if (students[i].name === inputName) {
            // result에 입력받은 값과 동일한 데이터 담기
            result = students[i].name;

            // 빈값이거나, 숫자가 아니면 출력
            if (inputName !== '' && isNaN(students)) {
                document.write(result + ' 입니다.');
                break;
            }
            
        } else {
            // 없는 경우
            document.write(`해당 학생을 찾을 수 없습니다.`);
            break;
        }

        
    }

    
    
    
    