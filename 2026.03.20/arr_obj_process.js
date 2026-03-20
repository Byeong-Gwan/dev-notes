/**
 * 요구사항
   - getActiveUserNames(users) 함수를 작성해서
   - active가 true인 사용자만 추출한 뒤, 이름(name)만 담은 배열을 반환하라.
 */


const users = [
    { id: 1, name: 'Kim', age: 32, active: true },
    { id: 2, name: 'Lee', age: 28, active: false },
    { id: 3, name: 'Park', age: 35, active: true },
    { id: 4, name: 'Choi', age: 24, active: true },
    { id: 5, name: 'Han', age: 28, active: false }
  ];

function getActiveUserNames(users) {

    if (!Array.isArray(users)) {
        return [];
    }

    return users.filter(user => user.active).map(user => user.name);
}

getActiveUserNames(users);
// 결과: ['Kim', 'Park', 'Choi']

/**
 * 1. users 안에 있는 값들 중 active가 true 인 값만 filter 해서 가져온다.
 * 2. filter된 값은 map 함수를 이용해서 name 값만 뽑아낸다. 
 * 
    입력은 사용자 객체 배열입니다.
    여기서 active가 true인 사용자만 먼저 걸러야 하고,
    최종 결과는 name만 담긴 배열입니다.
    그래서 filter로 활성 사용자만 추린 뒤, map으로 name만 추출하겠습니다.

    이렇게 말하면 입력, 조건, 출력, 접근 방식이 다 보여서 더 좋아다.

    문제점 : 예외처리 빠짐 !Array.isArray(users) 추가해줌
 */