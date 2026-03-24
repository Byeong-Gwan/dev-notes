/** API 응답에서 활성 사용자 이름만 안전하게 추출하기
 * 비동기 + 예외 처리 문제
 * 
 * 요구사항

    getActiveNames(response) 함수를 작성해서

    response.success가 true이고
    response.data가 배열일 때만

    active === true인 사용자들의 name만 담은 배열을 반환하라.

    그 외에는 빈 배열을 반환하라.
 */
// 결과: ['Kim', 'Park']

const response = {
    success: true,
    data: [
      { id: 1, name: 'Kim', active: true },
      { id: 2, name: 'Lee', active: false },
      { id: 3, name: 'Park', active: true }
    ]
  };

console.log(getActiveNames(response));;

function getActiveNames(response) {
    if (!response || response.success !== true || !Array.isArray(response.data)) {
        return [];
    }

    return response.data
                .filter(user => user.active)
                .map(user => user.name);
}

/** 입력, 조건, 출력, 접근 방식
  * 0. 입력은 API 응답 객체 이다.
  * 1. response.success가 true인지, response.data가 배열인지 먼저 확인한다.
  * 2. 조건이 맞지 않으면 빈 배열을 반환한다.
  * 2. 조건이 맞으면 filter로 active가 true인 사용자만 추출한다.
  * 3. 그 다음 map으로 각 사용자의 name 만 추출한다. 
  * 4. 최종적으로 이름만 담긴 배열을 반환한다.
  * 
  * 면접에서 말하면 좋은 버전
  *
    입력은 API 응답 객체입니다.
    먼저 success가 true인지, data가 배열인지 확인합니다.
    조건이 맞지 않으면 빈 배열을 반환하고,
    조건이 맞으면 active가 true인 사용자만 filter로 추린 뒤 map으로 name만 추출하겠습니다.
 */