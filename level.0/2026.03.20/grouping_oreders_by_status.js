/**
 * 요구사항
 *  groupOrdersByStatus(orders) 함수를 작성해서
 *  status 값을 기준으로 주문을 그룹핑한 객체를 반환하라.
 */


const orders = [
    { id: 1, product: 'Keyboard', status: 'ready' },
    { id: 2, product: 'Mouse', status: 'shipping' },
    { id: 3, product: 'Monitor', status: 'ready' },
    { id: 4, product: 'Laptop', status: 'done' },
    { id: 5, product: 'Desk', status: 'shipping' }
  ];

  function groupOrdersByStatus(orders) {
    // if (!Array.isArray(orders)) {
    //     return {}; 
    // }
    // return Object.groupBy(orders, ({ status }) => status);

    let result = {};

    if (!Array.isArray(orders)) {
        return result;
    }

    orders.forEach(function(order) {
        const status = order.status;

        if (!result[status]) {
            result[status] = [];
        }
        result[status].push(order);
    });
    return result;
  }

  groupOrdersByStatus(orders);
/*
    결과:
    {
        ready: [
            { id: 1, product: 'Keyboard', status: 'ready' },
            { id: 3, product: 'Monitor', status: 'ready' }
        ],
        shipping: [
            { id: 2, product: 'Mouse', status: 'shipping' },
            { id: 5, product: 'Desk', status: 'shipping' }
        ],
        done: [
            { id: 4, product: 'Laptop', status: 'done' }
        ]
    }
*/
/** 입력, 조건, 출력, 접근 방식
 * 0. 입력한 데이터는 객체 배열 입니다.
 * 1. status를 기준으로 그룹화
 * 2. 그룹화된 객체를 반환
 * 3. forEach로 각 주문을 하나씩 확인하면서 status별로 result 객체에 그룹화한다.
 *  3-1. forEach 함수보다 최신 문법 사용하여 쉽게 처리하는 방법
 *       객체 배열을 groupBy 함수로 status 별로 그룹화 시킵니다.
 * 4. result[status]가 없으면 빈 배열로 초기화한 뒤, 현재 주문을 추가한다
 */

/** 입력, 조건, 출력, 접근 방식 (Gpt 분석)
 * 0. 입력은 주문 객체 배열이다.
 * 1. 각 주문을 status 값을 기준으로 그룹화해야 한다.
 * 2. 결과는 status를 key로 하고, 해당 주문 배열을 value로 가지는 객체이다.
 * 3. forEach로 orders 배열을 순회하면서 각 order의 status를 확인한다.
 * 4. result 객체에 현재 status key가 없으면 빈 배열을 만든다.
 * 5. 해당 status 배열에 현재 order 객체를 push한다.
 * 6. 최종적으로 그룹화된 result 객체를 반환한다.
 * 
 * 추가:
 * 최신 문법을 사용할 수 있는 환경이라면 Object.groupBy로도 간단히 처리할 수 있다.
 */