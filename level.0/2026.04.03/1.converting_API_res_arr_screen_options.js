/**
 * API 응답을 화면용 옵션 배열로 변환하기
 * 
 * 요구사항

   - getMenuOptions(response) 함수를 작성해서 아래 조건을 만족하는 새 배열을 반환하라.

   - 조건:

    - response.success가 true이고 response.data가 배열일 때만 처리
    - soldOut === false 인 메뉴만 포함
    - 아래 형태로 변환
    [
    { value: 'A01', label: '아메리카노 (2000원)' },
    { value: 'C01', label: '카푸치노 (3500원)' }
    ]

    그 외에는 빈 배열 반환.
 */

    const response = {
        success: true,
        data: [
          { code: 'A01', name: '아메리카노', price: 2000, soldOut: false },
          { code: 'B01', name: '카페라떼', price: 3000, soldOut: true },
          { code: 'C01', name: '카푸치노', price: 3500, soldOut: false }
        ]
    };


    function getMenuOptions(response) {
        if (!response || response.success !== true || !Array.isArray(response.data)) {
            return [];
        }

        return response.data
                    .filter(menu => menu.soldOut === false)
                    .map((menu) => {
                        return {
                            value: menu.code,
                            label: `${menu.name} (${menu.price}원)`
                        }
                    });

    }

    console.log(getMenuOptions(response));

/**
 * 1. 입력은 API 응답 객체이다.
 * 2. reponse.success 가 true인지와 reponse.data 가 배열인지 먼저 확인한다.
 * 3. 조건이 맞지 않면 빈 배열을 반환하고,
 * 4. soldOut === false 인 메뉴만 필터링한다.
 * 5. 필터링된 메뉴를 { value, label } 형태로 반환한다.
 */