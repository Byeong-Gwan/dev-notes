/** 중복된 조건문 줄이기
 * 요구사항
    목표
    동작은 그대로 유지
    가독성을 높이기
    상태가 추가되더라도 관리하기 쉽게 만들기

 */
// 해당 로직 개선 문제
// function getUserMessage(user) {
//     if (!user) {
//         return '사용자 정보가 없습니다.';
//     }
    
//     if (user.status === 'active') {
//         return '활성 사용자입니다.';
//     }
    
//     if (user.status === 'inactive') {
//         return '비활성 사용자입니다.';
//     }
    
//     if (user.status === 'banned') {
//         return '차단된 사용자입니다.';
//     }
    
//     return '알 수 없는 상태입니다.';
// }

// console.log(getUserMessage({ status: 'active' }));   // '활성 사용자입니다.'
// console.log(getUserMessage({ status: 'inactive' })); // '비활성 사용자입니다.'
// console.log(getUserMessage({ status: 'banned' }));   // '차단된 사용자입니다.'
// console.log(getUserMessage({ status: 'unknown' }));  // '알 수 없는 상태입니다.'
// console.log(getUserMessage(null));                   // '사용자 정보가 없습니다.'

function getUserMessage(user) {
    const notices = {
        'active': '활성 사용자입니다.',
        'inactive': '비활성 사용자입니다.',
        'banned': '차단된 사용자입니다.',
        'unknown': '알 수 없는 상태입니다.'
    };

    if(!user) {
        return '사용자 정보가 없습니다.';
    }
    
    if (notices[user.status]) {
        return notices[user.status];
    }
    
    return notices['unknown'];
}

console.log(getUserMessage({ status: 'active' }));   // '활성 사용자입니다.'
console.log(getUserMessage({ status: 'inactive' })); // '비활성 사용자입니다.'
console.log(getUserMessage({ status: 'banned' }));   // '차단된 사용자입니다.'
console.log(getUserMessage({ status: 'unknown' }));  // '알 수 없는 상태입니다.'
console.log(getUserMessage(null));                   // '사용자 정보가 없습니다.'

/**
 * 1. 택스트로 분산되어 있는 내용들 하나의 객체로 묶음
 * 2. 하나의 if문으로 중요 택스트 문 정리해서 노출 
 */
/**
 * 
 * 설명 
    1. 입력은 user 객체이다.
    2. user가 없으면 사용자 정보가 없다는 메시지를 반환한다.
    3. 기존 코드는 status별로 if문이 반복되어 관리가 불편하다.
    4. 그래서 status별 메시지를 객체로 분리해서 한 곳에서 관리한다.
    5. user.status에 해당하는 메시지가 있으면 그 값을 반환한다.
    6. 없으면 기본 메시지인 '알 수 없는 상태입니다.'를 반환한다.

 * 면접에서 말하면 좋은 버전
    현재 코드는 status별로 if문이 반복돼서 상태가 늘어날수록 관리하기 어려운 구조입니다.
    그래서 상태별 메시지를 객체로 분리해서 한 곳에서 관리하도록 바꾸겠습니다.
    user가 없으면 먼저 예외 처리하고,
    status에 해당하는 메시지가 있으면 반환하고 없으면 기본 메시지를 반환하겠습니다.
 */