/** 특정 todo 완료 상태 토글하기
 * 요구사항
 * toggleTodo(todos, id) 함수를 작성해서
   전달받은 id와 일치하는 todo의 completed 값을 반대로 바꾼 새 배열을 반환하라.

    true면 false
    false면 true
 */
/*
    결과:
        [
            { id: 1, text: '운동하기', completed: false },
            { id: 2, text: '책 읽기', completed: false },
            { id: 3, text: '공부하기', completed: false }
        ]
*/
const todos = [
    { id: 1, text: '운동하기', completed: false },
    { id: 2, text: '책 읽기', completed: true },
    { id: 3, text: '공부하기', completed: false }
  ];

  function toggleTodo(todos, num) {
    if (!Array.isArray(todos)) {
        return [];
    }

    return todos.map((todo) => {
        if(todo.id === num) {
            return {...todo, completed: !todo.completed};
        }
        return todo;
    });
  }
  console.log(toggleTodo(todos, 2));


/** 입력, 조건, 출력, 접근 방식
 * 0. 입력은 todo 객체 배열과 id 값이다.
 * 1. 전달받은 id와 일치하는 todo를 찾아야 한다.
 * 2. 해당 todo의 completed 값을 반대로 바꾼 새 객체를 반환한다.
 * 3. id가 일치하지 않는 todo는 그대로 유지한다.
 * 4. 최종적으로 변경된 새 배열을 반환한다.
 * 5. todos가 배열이 아니면 빈 배열을 반환한다.
*/

/**
 * 면접에서 말하면 좋은 버전

    입력은 todo 객체 배열과 id입니다.
    전달받은 id와 일치하는 todo의 completed 값을 반대로 바꾼 새 배열을 반환해야 합니다.
    원본을 직접 수정하지 않기 위해 map으로 배열을 순회하고,
    id가 일치하는 경우에만 새 객체를 만들어 completed 값을 토글하겠습니다.
    일치하지 않는 todo는 그대로 반환하고, todos가 배열이 아니면 빈 배열을 반환하겠습니다.
 */