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
    const obj = new Set();

    for (const user of users){
        if (!obj.has(user.email)) {
            newInfo.push(user);
            obj.add(user.email);
        }
    }

    return newInfo;
}

console.log(removeDuplicateUsers(users));

/**
 * 입력은 사용자 객체 배열이다.
 * email을 기준으로 중복을 제거해야 한다.
 * 같은 email이 여러 개면 첫 번째 사용자만 유지한다.
 * 최종적으로 중복이 제거된 새 배열을 반환한다.
 * 
 * 입력은 사용자 객체 배열입니다.
 * email 기준으로 중복을 제거해야 하고, 같은 email이 여러 개면 먼저 나온 사용자만 유지하면 됩니다.
 * 그래서 이미 본 email을 저장할 Set을 하나 만들고, 배열을 순회하면서 처음 나온 email만 결과 배열에 추가하겠습니다.
 * 
 * 결과 배열과 이미 본 email을 저장할 Set을 준비한다.
 * 배열을 순회하면서 각 user의 email을 확인한다.
 * 처음 나온 email이면 Set에 저장하고 결과 배열에 추가한다.
 * 이미 본 email이면 추가하지 않는다.
 * 최종적으로 결과 배열을 반환한다.
 */