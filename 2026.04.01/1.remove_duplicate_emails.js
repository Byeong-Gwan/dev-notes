/**
 * 중복 이메일 제거하기
 * 조건:

    먼저 나온 email만 유지
    뒤에 나오는 같은 email은 제거
 */
/*
결과:
[
  { id: 1, name: 'Kim', email: 'kim@test.com' },
  { id: 2, name: 'Lee', email: 'lee@test.com' },
  { id: 4, name: 'Choi', email: 'choi@test.com' }
]
*/

const users = [
    { id: 1, name: 'Kim', email: 'kim@test.com' },
    { id: 2, name: 'Lee', email: 'lee@test.com' },
    { id: 3, name: 'Park', email: 'kim@test.com' },
    { id: 4, name: 'Choi', email: 'choi@test.com' }
];
// 0. 배열 순회 새로운 배열로 만들기
// 1. 처음 나오는 새로운 이메일 저장
// 2. 동일한 이메일이 있으면 처음나온 이메일 저장
// 3. 동일한 이메일이 없을 때는 새로운 이메일 저장
// 4. 배열 출력

/**
 * 1. 첫번째 배열안에 있는 객체를 변수에 담는다.
 * 2. 담은 변수로 전체 비교 후 그 다음 변수를 담는다 
 * 3. 반복함
 * 4. 저장된 값을 반환
 */

function removeDuplicateUsers(users) {
    if (!Array.isArray(users)) {
        return [];
    }
    
    const newInfo = [];
    let obj = new Set();

    for (const user of users){
        if (!obj.has(user.email)) {
            newInfo.push(user);
            obj.add(user.email);
        }
    }

    return newInfo;
}

console.log(removeDuplicateUsers(users));