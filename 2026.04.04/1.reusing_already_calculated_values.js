/**간단한 캐시 / 중복 호출 방지 사고 문제
 * 실무
 * 같은 계산 반복 줄이기
 * 같은 요청 결과 재사용하기
 * 불필요한 처리 줄이기
 */

/** 이미 계산한 값 재사용하기
 * 요구사항

    createCategoryCounter(products) 함수를 작성해서
    카테고리별 개수를 조회하는 함수를 반환하라.

    반환된 함수는 이렇게 동작해야 한다.

 * 결과
    const getCount = createCategoryCounter(products);

    getCount('device');     // 3
    getCount('stationery'); // 2
    getCount('food');       // 0
*/


  const products = [
    { id: 1, name: '키보드', category: 'device' },
    { id: 2, name: '마우스', category: 'device' },
    { id: 3, name: '노트', category: 'stationery' },
    { id: 4, name: '펜', category: 'stationery' },
    { id: 5, name: '모니터', category: 'device' }
  ];

  function createCategoryCounter(products) {

  }

  const getCount = createCategoryCounter(products);

  console.log(getCount('device'));     // 3
  console.log(getCount('stationery')); // 2
  console.log(getCount('food'));       // 0